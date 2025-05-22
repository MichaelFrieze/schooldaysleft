import { UserProfile } from "@/modules/user/ui/components/user-profile";

export const AccountView = () => {
  return (
    <section className="container flex min-h-[calc(100vh-64px)] justify-center md:items-center">
      <div className="py-8 md:pb-32">
        <UserProfile />
      </div>
    </section>
  );
};
