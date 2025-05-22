import { UserProfile } from "@/modules/user/ui/components/user-profile";

export const AccountView = () => {
  return (
    <section className="container py-8 md:py-12">
      <div className="flex justify-center">
        <div className="h-[44rem] w-[55rem] max-w-[calc(-7rem+100vw)]">
          <UserProfile />
        </div>
      </div>
    </section>
  );
};
