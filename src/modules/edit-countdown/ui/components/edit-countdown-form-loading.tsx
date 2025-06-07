import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const NameAndDatesSectionSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WeeklyDaysOffSectionSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <Skeleton className="mx-auto h-4 w-full max-w-sm" />
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-[60px] rounded-full" />
          ))}
        </div>
        <div className="border-muted bg-muted/50 space-y-2 rounded-lg border p-4">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mx-auto h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  );
};

const AdditionalDaysOffSectionSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-center rounded-md border p-3">
                <div className="w-full space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, j) => (
                      <Skeleton key={j} className="h-8 w-8 rounded-md" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-muted rounded-md p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FormSummarySectionSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-24" />
        </CardTitle>
        <Skeleton className="h-4 w-full max-w-sm" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              {i < 3 && <Separator />}
            </div>
          ))}
        </div>
        <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
          <div className="flex flex-row justify-center gap-2">
            <Skeleton className="h-10 flex-1 px-4 py-2" />
            <Skeleton className="h-10 w-10 px-4 py-2" />
          </div>
          <Skeleton className="h-10 sm:w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export const EditCountdownFormLoading = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <NameAndDatesSectionSkeleton />
      <WeeklyDaysOffSectionSkeleton />
      <AdditionalDaysOffSectionSkeleton />
      <FormSummarySectionSkeleton />
    </div>
  );
};
