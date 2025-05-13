export {};

declare global {
  interface CustomJwtSessionClaims {
    userSettings?: { theme: string };
  }
}
