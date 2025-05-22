import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardView />;
};

export default Page;
