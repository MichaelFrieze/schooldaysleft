import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const PreferencesFooter = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-4">
        <div className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Frieze Labs. All rights reserved.
          </p>

          <div className="flex gap-2">
            <Button variant={"ghost"} className="text-muted-foreground" asChild>
              <a
                href="https://frieze.dev"
                target="_blank"
                aria-label="Support This App"
              >
                Support This App
              </a>
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground"
              asChild
            >
              <a
                href="mailto:contact@schooldaysleft.com"
                target="_blank"
                aria-label="Contact us"
              >
                <Mail />
              </a>
            </Button>
            <div className="text-muted-foreground">
              <ModeToggle variant={"ghost"} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
