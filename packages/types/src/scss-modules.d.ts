/**
 * Type declarations for SCSS Modules
 * This file provides TypeScript support for importing .module.scss files
 * across the monorepo.
 */
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

