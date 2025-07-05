import { UserProfile } from "@/modules/user/ui/components/user-profile";

export const AccountView = () => {
  return (
    <section className="container">
      <div className="fixed top-[50%] left-[50%] w-[calc(100vw-4rem)] max-w-[55rem] translate-x-[-50%] translate-y-[-50%] sm:w-[calc(100vw-4rem)] sm:max-w-[55rem]">
        <UserProfile />
      </div>
    </section>
  );
};
