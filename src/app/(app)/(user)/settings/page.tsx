import { SettingsView } from "@/modules/settings/ui/views/settings-view";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <SettingsView />;
};

export default Page;
