/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type EdgeLocals = import('@astrojs/vercel').EdgeLocals

declare namespace App {
  interface Locals extends EdgeLocals {
    // ...
  }
}