import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/modules/user/ui/components/mode-toggle";
import { ThemeSwitcher } from "@/modules/user/ui/components/theme-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const UserSettingsView = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-12">
        <div className="">
          <h1 className="text-2xl font-bold md:text-3xl">User Settings</h1>
        </div>
      </div>

      {/* Theme Preview Section */}
      <div className="mb-12">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Theme Preferences</CardTitle>
            <p className="text-muted-foreground">
              See how colors change instantly across UI elements
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col items-center justify-between rounded-md sm:border sm:p-4">
              <div className="flex items-center gap-2">
                <ModeToggle variant="outline" />
                <ThemeSwitcher />
              </div>
            </div>

            {/* Color Palette */}
            <div className="from-primary via-secondary via-accent via-muted to-background mb-6 h-24 w-full rounded-xl bg-gradient-to-r"></div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Button className="w-full">Primary Button</Button>

              <Button variant="secondary" className="w-full">
                Secondary Button
              </Button>

              <Card>
                <CardContent className="flex items-center justify-center">
                  <p>Card Background</p>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="flex items-center justify-center">
                  <p>Muted Background</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
