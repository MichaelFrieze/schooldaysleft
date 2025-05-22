import { AuthSignIn } from "../components/auth-sign-in";

export const AuthView = () => {
  return (
    <section className="container flex min-h-[calc(100vh-64px)] justify-center md:items-center">
      <div className="py-8 md:pb-24">
        <AuthSignIn />
      </div>
    </section>
  );
};
