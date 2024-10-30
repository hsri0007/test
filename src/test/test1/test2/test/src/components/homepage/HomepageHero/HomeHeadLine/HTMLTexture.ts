import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
import { boolean } from 'zod';

export class HTMLTexture extends CanvasTexture {
  dom: any;
  debug: boolean;

  constructor(dom: any, debug: boolean = false) {
    super(html2canvas(dom, debug));

    this.dom = dom;
    this.debug = debug;

    this.anisotropy = 16;
    this.minFilter = LinearFilter;
    this.magFilter = LinearFilter;
  }

  dispatchDOMEvent(event: any) {
    htmlevent(this.dom, event.type, event.data.x, event.data.y);

    this.update();
  }

  update() {
    this.image = html2canvas(this.dom, this.debug);
    this.needsUpdate = true;
  }
}

//

const canvases = new WeakMap();

class Clipper {
  context: CanvasRenderingContext2D;
  clips: any[];
  isClipping: boolean;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.clips = [];
    this.isClipping = false;
  }

  doClip() {
    if (this.isClipping) {
      this.isClipping = false;
      this.context.restore();
    }

    if (this.clips.length === 0) return;

    var minX = -Infinity,
      minY = -Infinity;
    var maxX = Infinity,
      maxY = Infinity;

    for (var i = 0; i < this.clips.length; i++) {
      var clip: any = this.clips[i];

      minX = Math.max(minX, clip.x);
      minY = Math.max(minY, clip.y);
      maxX = Math.min(maxX, clip.x + clip.width);
      maxY = Math.min(maxY, clip.y + clip.height);
    }

    this.context.save();
    this.context.beginPath();
    this.context.rect(minX, minY, maxX - minX, maxY - minY);
    this.context.clip();

    this.isClipping = true;
  }

  add(clip: any) {
    this.clips.push(clip);
    this.doClip();
  }

  remove() {
    this.clips.pop();
    this.doClip();
  }
}

export function html2canvas(element: any, debug: boolean = false) {
  var range = document.createRange();

  function drawText(style: any, x: number, y: number, string: string) {
    if (string !== '') {
      if (style.textTransform === 'uppercase') {
        string = string.toUpperCase();
      }
      if (context) {
        context.font = style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
        context.textBaseline = 'top';
        context.fillStyle = style.color;
        context.fillText(string, x, y);
      }
    }
  }

  function drawBorder(style: any, which: any, x: number, y: number, width: number, height: number) {
    var borderWidth = style[which + 'Width'];
    var borderStyle = style[which + 'Style'];
    var borderColor = style[which + 'Color'];

    if (
      borderWidth !== '0px' &&
      borderStyle !== 'none' &&
      borderColor !== 'transparent' &&
      borderColor !== 'rgba(0, 0, 0, 0)'
    ) {
      if (context) {
        context.strokeStyle = borderColor;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
        context.stroke();
      }
    }
  }

  function drawElement(element: any, style: any = null) {
    var x = 0,
      y = 0,
      width = 0,
      height = 0;

    if (element.nodeType === 3) {
      // text

      range.selectNode(element);

      var rect = range.getBoundingClientRect();

      x = rect.left - offset.left - 0.5;
      y = rect.top - offset.top - 0.5;
      width = rect.width;
      height = rect.height;

      const nodeText = element.nodeValue.trim();
      drawText(style, x, y, nodeText);
    } else {
      if (element.style.display === 'none') return;

      var rect: DOMRect = element.getBoundingClientRect();

      x = rect.left - offset.left - 0.5;
      y = rect.top - offset.top - 0.5;
      width = rect.width;
      height = rect.height;

      style = window.getComputedStyle(element);

      var backgroundColor = style.backgroundColor;

      if (backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        // context.fillStyle = backgroundColor;
        // context.fillRect(x, y, width, height);
      }

      drawBorder(style, 'borderTop', x, y, width, 0);
      drawBorder(style, 'borderLeft', x, y, 0, height);
      drawBorder(style, 'borderBottom', x, y + height, width, 0);
      drawBorder(style, 'borderRight', x + width, y, 0, height);

      if (element.type === 'color' || element.type === 'text') {
        clipper.add({ x: x, y: y, width: width, height: height });

        const nodeText = element.value;
        drawText(style, x + parseInt(style.paddingLeft), y + parseInt(style.paddingTop), nodeText);

        clipper.remove();
      }
    }

    /*
		// debug
		context.strokeStyle = '#' + Math.random().toString( 16 ).slice( - 3 );
		context.strokeRect( x - 0.5, y - 0.5, width + 1, height + 1 );
		*/

    var isClipping = style.overflow === 'auto' || style.overflow === 'hidden';

    if (isClipping) clipper.add({ x: x, y: y, width: width, height: height });

    for (var i = 0; i < element.childNodes.length; i++) {
      drawElement(element.childNodes[i], style);
    }

    if (isClipping) clipper.remove();
  }

  const offset: DOMRect = element.getBoundingClientRect();

  let canvas: HTMLCanvasElement;

  if (canvases.has(element)) {
    canvas = canvases.get(element);
  } else {
    canvas = document.createElement('canvas');
    if (debug) {
      document.body.appendChild(canvas);
      canvas.style.position = 'absolute';
      canvas.style.left = '50%';
      canvas.style.top = '50%';
    }
  }
  canvas.width = offset.width;
  canvas.height = offset.height;

  const context = canvas.getContext('2d');

  const clipper = new Clipper(context as CanvasRenderingContext2D);

  // console.time( 'drawElement' );

  drawElement(element);

  // console.timeEnd( 'drawElement' );

  return canvas;
}

function htmlevent(element: any, event: any, x: number, y: number) {
  const mouseEventInit = {
    clientX: x * element.offsetWidth + element.offsetLeft,
    clientY: y * element.offsetHeight + element.offsetTop,
    view: element.ownerDocument.defaultView,
  };

  window.dispatchEvent(new MouseEvent(event, mouseEventInit));

  const rect = element.getBoundingClientRect();

  x = x * rect.width + rect.left;
  y = y * rect.height + rect.top;

  function traverse(element: any) {
    if (element.nodeType !== 3) {
      const rect = element.getBoundingClientRect();

      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        element.dispatchEvent(new MouseEvent(event, mouseEventInit));
      }

      for (var i = 0; i < element.childNodes.length; i++) {
        traverse(element.childNodes[i]);
      }
    }
  }

  traverse(element);
}
