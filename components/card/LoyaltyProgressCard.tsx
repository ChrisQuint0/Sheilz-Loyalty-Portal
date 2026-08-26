import { SectionCard } from "@/components/common/SectionCard";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StampProgress } from "./StampProgress";

interface LoyaltyProgressCardProps {
  currentStamps: number;
  targetStamps: number;
  isEmpty?: boolean;
}

export function LoyaltyProgressCard({
  currentStamps,
  targetStamps,
  isEmpty = false,
}: LoyaltyProgressCardProps) {
  const remaining = Math.max(targetStamps - currentStamps, 0);
  const isComplete = currentStamps >= targetStamps;

  return (
    <SectionCard className="p-6">
      <h2 className="text-lg font-semibold tracking-tight text-center mb-6">
        Loyalty Progress
      </h2>

      {isEmpty ? (
        <div className="text-center">
          <p className="mb-4 text-sm">
            Welcome — purchase a drink to start collecting stamps!
          </p>
          <div className="mx-auto mb-4">
            <StampProgress current={0} target={targetStamps} />
          </div>
        </div>
      ) : (
        <>
          <StampProgress current={currentStamps} target={targetStamps} />

          <ProgressBar
            current={currentStamps}
            total={targetStamps}
            className="mb-4"
          />

          <p className="text-sm text-center font-medium text-muted-foreground">
            {isComplete
              ? "You have a FREE drink waiting!"
              : `${remaining} more purchase${remaining === 1 ? "" : "s"} until your FREE drink.`}
          </p>
        </>
      )}
    </SectionCard>
  );
}
