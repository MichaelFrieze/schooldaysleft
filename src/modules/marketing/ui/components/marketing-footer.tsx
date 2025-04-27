import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const MarketingFooter = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6">
        <div className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row sm:gap-0">
          <Button
            variant={"link"}
            size={"sm"}
            className="text-muted-foreground text-sm"
          >
            <a
              href="https://frieze.dev"
              target="_blank"
              aria-label="Frieze Labs website"
            >
              &copy; {new Date().getFullYear()} Frieze Dev
            </a>
          </Button>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="text-muted-foreground"
              asChild
            >
              <a
                href="https://frieze.dev"
                target="_blank"
                aria-label="Support This App"
              >
                Support This App
              </a>
            </Button>
            <Button
              variant={"outline"}
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
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
