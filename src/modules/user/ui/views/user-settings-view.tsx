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
            <div className="mb-6 flex flex-col items-center justify-between rounded-md border p-4">
              <div className="flex items-center gap-2">
                <ModeToggle variant="outline" />
                <ThemeSwitcher />
              </div>
            </div>

            {/* Color Palette */}
            <div className="mb-6 space-y-2 text-center">
              <div className="from-primary via-secondary via-accent via-muted to-background h-24 w-full rounded-xl bg-gradient-to-r"></div>
              {/* <div className="text-muted-foreground grid grid-cols-5 gap-2 text-xs">
                  <div>Primary</div>
                  <div>Secondary</div>
                  <div>Accent</div>
                  <div>Muted</div>
                  <div>Background</div>
                </div> */}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Button className="w-full">Primary Button</Button>

              <Button variant="secondary" className="w-full">
                Secondary Button
              </Button>

              <Card>
                <CardContent className="flex h-24 items-center justify-center p-6">
                  <p>Card Background</p>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="flex h-24 items-center justify-center p-6">
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
