import { CountdownDetailsSection } from "../sections/countdown-details-section";
import { CountdownHeaderSection } from "../sections/countdown-header-section";
import { CountdownMainSection } from "../sections/countdown-main-section";

interface CountdownViewProps {
  countdownId: string;
}

export const CountdownView = ({ countdownId }: CountdownViewProps) => {
  return (
    <div className="container">
      <CountdownHeaderSection countdownId={countdownId} />
      <CountdownMainSection countdownId={countdownId} />
      <CountdownDetailsSection countdownId={countdownId} />
    </div>
  );
};
