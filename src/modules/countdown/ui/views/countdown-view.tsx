"use client";

import { Button } from "@/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { CountdownDetailsSection } from "../sections/countdown-details-section";
import { CountdownHeaderSection } from "../sections/countdown-header-section";
import { CountdownMainSection } from "../sections/countdown-main-section";

interface CountdownViewProps {
  countdownId: string;
}

export const CountdownView = ({ countdownId }: CountdownViewProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="container">
      <ErrorBoundary FallbackComponent={CountdownError} onReset={reset}>
        <CountdownHeaderSection countdownId={countdownId} />
        <CountdownMainSection countdownId={countdownId} />
        <CountdownDetailsSection countdownId={countdownId} />
      </ErrorBoundary>
    </div>
  );
};

const CountdownError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <section className="flex min-h-48 flex-col items-center justify-center gap-4 py-8 text-center md:py-12">
      <AlertTriangle className="text-destructive h-8 w-8" />
      <h3 className="text-lg font-medium">Something went wrong</h3>
      <p className="text-muted-foreground text-sm">
        There was an issue loading the countdown.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" size="sm">
        Try Again
      </Button>
    </section>
  );
};
