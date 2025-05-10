export {};

declare global {
  interface CustomJwtSessionClaims {
    userPreferences?: { theme: string };
  }
}
