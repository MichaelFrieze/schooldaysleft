import { NewCountdownMockForm } from "../components/new-countdown-mock-form";

export const NewCountdownView = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="pb-8 text-center">
        <h1 className="text-3xl font-bold">Create New Countdown</h1>
        <p className="text-muted-foreground pt-2">
          Set up your school year countdown with custom dates and days off.
        </p>
      </div>
      <NewCountdownMockForm />
    </div>
  );
};
