import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Clock, PenLine, School, Settings, Sparkles, User } from "lucide-react";
import Link from "next/link";

export const MarketingView = async () => {
  return (
    <>
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Countdown
              </span>{" "}
              to Your Next Break
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Track the days remaining until holidays, summer vacation, or any
              time off. Stay motivated and see the finish line.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="default"
                className="min-w-[240px] gap-2"
              >
                <Link href="/dashboard">
                  <School className="h-5 w-5" />
                  Start Your Countdown
                </Link>
              </Button>
            </div>
            {/* <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Set up in less than 2 minutes</span>
            </div> */}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="bg-card/10 absolute -top-6 -left-6 h-64 w-64 rounded-full blur-3xl"></div>
              <div className="bg-secondary/10 absolute -right-8 -bottom-8 h-64 w-64 rounded-full blur-3xl"></div>
              <div className="bg-card relative rounded-2xl border p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Summer Break</h3>
                  <Settings className="text-muted-foreground h-5 w-5" />
                </div>
                <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-accent/80 rounded-lg p-3">
                    <div className="text-primary text-3xl font-bold">42</div>
                    <div className="text-muted-foreground text-xs">Days</div>
                  </div>
                  <div className="bg-accent/80 rounded-lg p-3">
                    <div className="text-primary text-3xl font-bold">08</div>
                    <div className="text-muted-foreground text-xs">Hours</div>
                  </div>
                  <div className="bg-accent/80 rounded-lg p-3">
                    <div className="text-primary text-3xl font-bold">15</div>
                    <div className="text-muted-foreground text-xs">Minutes</div>
                  </div>
                </div>
                <div className="text-muted-foreground text-center text-sm">
                  <span className="font-medium">21%</span> of the school year
                  completed
                </div>
                <div className="bg-muted mt-3 h-2 w-full overflow-hidden rounded-full">
                  <div className="from-primary/80 to-primary/100 h-full w-[21%] bg-gradient-to-r"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Key Features
          </h2>
          <p className="mx-auto max-w-2xl text-slate-300">
            Everything you need to keep track of important school dates and stay
            motivated throughout the year.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-900/30 text-purple-400">
                <User className="h-5 w-5" />
              </div>
              <CardTitle className="text-white">Separate Countdowns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Track both teacher workdays and student school days separately.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-900/30 text-purple-400">
                <Settings className="h-5 w-5" />
              </div>
              <CardTitle className="text-white">Easy Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Set start/end dates, then easily mark off holidays and non-work
                days.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-900/30 text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-white">Daily Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Optional daily inspirational quotes to keep spirits high.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-900/30 text-purple-400">
                <PenLine className="h-5 w-5" />
              </div>
              <CardTitle className="text-white">Colorful Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Personalize your countdown with multiple color themes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

// export const MarketingView = async () => {
//   return (
//     <div className="container px-4 py-12 sm:py-24">
//       <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
//         <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
//           Countdown to Your Next Break
//         </h1>

//         <p className="text-muted-foreground max-w-xl text-lg sm:text-xl md:text-2xl">
//           Track the days remaining until holidays, summer vacation, or any time
//           off. Stay motivated and see the finish line.
//         </p>

//         <div className="mt-6 mb-10">
//           <Button
//             asChild
//             size="lg"
//             variant="default"
//             className="min-w-[240px] gap-2"
//           >
//             <Link href="/dashboard">
//               <School className="h-5 w-5" />
//               Start Your Countdown
//             </Link>
//           </Button>
//         </div>

//         <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
//           <Card className="text-left">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-lg font-medium">
//                 Separate Countdowns
//               </CardTitle>
//               <Users className="text-muted-foreground h-5 w-5" />
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground text-sm">
//                 Track both teacher workdays and student school days separately.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="text-left">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-lg font-medium">Easy Setup</CardTitle>
//               <CalendarDays className="text-muted-foreground h-5 w-5" />
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground text-sm">
//                 Set start/end dates, then easily mark off holidays and non-work
//                 days.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="text-left">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-lg font-medium">
//                 Daily Motivation
//               </CardTitle>
//               <Sparkles className="text-muted-foreground h-5 w-5" />
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground text-sm">
//                 Optional daily inspirational quotes to keep spirits high.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="text-left">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-lg font-medium">
//                 Colorful Themes
//               </CardTitle>
//               <Palette className="text-muted-foreground h-5 w-5" />
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground text-sm">
//                 Personalize your countdown with multiple color themes.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
