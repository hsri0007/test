declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}

declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module '*.yaml' {
  const content: { [key: string]: any };
  export default content;
}

declare module '*.yml' {
  const content: { [key: string]: any };
  export default content;
}
