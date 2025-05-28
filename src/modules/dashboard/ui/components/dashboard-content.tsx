export const DashboardContent = () => {
  return <div>DashboardContent</div>;
};

// {
//   false ? (
//     <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
//       <CalendarDays className="text-muted-foreground mb-4 h-12 w-12" />
//       <h3 className="mb-2 text-lg font-medium">No Countdowns Yet</h3>
//       <p className="text-muted-foreground max-w-sm text-sm">
//         Create your first countdown to track the days left until your next break
//         or the end of the school year.
//       </p>
//       <Button asChild variant="outline" className="mt-6">
//         <Link href="/countdown/new">
//           <Plus className="mr-2 h-4 w-4" />
//           Create Your First Countdown
//         </Link>
//       </Button>
//     </div>
//   ) : (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {countdowns.map((countdown) => {
//         const startDate = new Date(countdown.createdAt).getTime();
//         const endDate = new Date(countdown.endDate).getTime();
//         const now = Date.now();

//         let progressValue = 100; // Default to 100% (full progress)
//         const timeRemaining = endDate - now;
//         const totalDuration = endDate - startDate;

//         if (totalDuration > 0) {
//           // Calculate progress as percentage of time elapsed
//           progressValue =
//             100 -
//             Math.max(
//               0, // Ensure progress doesn't go below 0
//               Math.min(100, (timeRemaining / totalDuration) * 100), // Clamp at 100
//             );
//         }

//         // If past end date, show 100% progress
//         if (now > endDate) {
//           progressValue = 100;
//         }

//         return (
//           <DashboardCountdownCard
//             key={countdown.id}
//             id={countdown.id}
//             name={countdown.name}
//             endDate={countdown.endDate}
//             progressValue={progressValue}
//           />
//         );
//       })}
//     </div>
//   );
// }
