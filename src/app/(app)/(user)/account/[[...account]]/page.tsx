import { AccountView } from "@/modules/account/ui/views/account-view";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <AccountView />;
};

export default Page;
