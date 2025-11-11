import 'express';

declare module 'express-serve-static-core' {
  interface User {
    id: number | string;
    email?: string;
    role?: string;
    [key: string]: unknown;
  }
}

export {};

