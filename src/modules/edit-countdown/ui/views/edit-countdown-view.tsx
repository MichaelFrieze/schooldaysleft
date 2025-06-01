import { EditCountdownForm } from "@/modules/edit-countdown/ui/components/edit-countdown-form";

export const EditCountdownView = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="pb-8 text-center">
        <h1 className="pb-2 text-3xl font-bold">Edit Countdown</h1>
      </div>
      <EditCountdownForm />
    </div>
  );
};
