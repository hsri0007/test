uniform float uBlur;
uniform float uNoiseFactor;
uniform float uNoiseScale;
uniform float uNoiseSpeedFactor;
uniform float uGrainIntensity;
uniform float uTime;
uniform float uOpacity;
uniform sampler2D uTxt;
uniform sampler2D uNoiseTxt;
varying vec2 vUv;


// Mipped Bicubic Texture Filtering by N8
float w0( float a ) {
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
}

float w1( float a ) {
    return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
}

float w2( float a ){
    return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
}

float w3( float a ) {
    return ( 1.0 / 6.0 ) * ( a * a * a );
}

// g0 and g1 are the two amplitude functions
float g0( float a ) {
    return w0( a ) + w1( a );
}

float g1( float a ) {
    return w2( a ) + w3( a );
}

// h0 and h1 are the two offset functions
float h0( float a ) {
    return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
}

float h1( float a ) {
    return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
}

vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
    uv = uv * texelSize.zw + 0.5;

    vec2 iuv = floor( uv );
    vec2 fuv = fract( uv );

    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );

    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

    return 
        g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) )
        + g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

}

vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );
}

vec2 scaleFromCenter(vec2 uv, float scale) {
    vec2 center = vec2(0.5, 0.5);
    vec2 scaledUV = (uv - center) * scale + center;
    return scaledUV;
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    float r = random(vUv);
    r = smoothstep(0.1, 0.5, r) * 0.5;
    r = clamp(r - 0.35, 0.0, 1.0);

    float t = uTime * uNoiseSpeedFactor;
    float n1 = texture2D(uNoiseTxt, scaleFromCenter(vUv, uNoiseScale) + vec2(t * 0.02, 0.0)).r;
    float n2 = texture2D(uNoiseTxt, scaleFromCenter(vUv, uNoiseScale) + vec2(-t * 0.07, t * 0.03)).r;
    n2 = (n2 * 2.0) - 1.0;

    float n  =(n1 + n2) * 0.5;
    vec4 final = textureBicubic(uTxt, vUv + n * uNoiseFactor, uBlur * (0.7 + smoothstep(0.2, 0.8, n1) * 0.3));
    final.a = uOpacity;
    final.rgb *= 1.0 - r * uGrainIntensity; 

    gl_FragColor = final;

    #include <colorspace_fragment> 
}