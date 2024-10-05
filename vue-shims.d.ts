// vue-shims.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<NonNullable<unknown>, NonNullable<unknown>, any>;
  export default component;
}

// 如果你使用了 CSS Modules
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
