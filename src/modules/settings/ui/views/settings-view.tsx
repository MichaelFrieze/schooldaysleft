import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/modules/settings/ui/components/mode-toggle";
import { ThemeSwitcher } from "@/modules/settings/ui/components/theme-switcher";

export const SettingsView = () => {
  return (
    <section className="container py-8 md:py-12">
      {/* <div className="mb-8">
        <div className="">
          <h1 className="text-2xl font-bold">User Settings</h1>
        </div>
      </div> */}

      <div className="">
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
    </section>
  );
};
