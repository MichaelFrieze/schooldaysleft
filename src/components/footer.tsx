import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/modules/settings/ui/components/mode-toggle";
import { Mail, Settings2 } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 sm:py-4">
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
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground"
              asChild
            >
              <Link href="/settings">
                <Settings2 />
              </Link>
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
