declare module 'js-cookie' {
  const Cookies: {
    get(name: string): string | undefined;
    getJSON(name: string): any;
    set(name: string, value: string | object, options?: any): void;
    remove(name: string, options?: any): void;
  };
  export default Cookies;
}
