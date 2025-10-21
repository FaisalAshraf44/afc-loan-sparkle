import { Check, Clock, FileCheck, XCircle } from "lucide-react";

const stages = [
  { id: 1, name: "Application Submitted", icon: FileCheck },
  { id: 2, name: "Document Verification", icon: Clock },
  { id: 3, name: "Credit Assessment", icon: Clock },
  { id: 4, name: "Final Decision", icon: Check },
];

interface WorkflowStagesProps {
  currentStage: number;
}

export const WorkflowStages = ({ currentStage }: WorkflowStagesProps) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => {
          const isCompleted = stage.id < currentStage;
          const isCurrent = stage.id === currentStage;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex flex-col items-center flex-1">
              <div
                className={`
                  relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all
                  ${
                    isCompleted
                      ? "border-success bg-success text-success-foreground"
                      : isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <p
                className={`mt-2 text-xs font-medium text-center ${
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stage.name}
              </p>

              {index < stages.length - 1 && (
                <div
                  className={`absolute top-6 h-0.5 transition-all ${
                    isCompleted ? "bg-success" : "bg-border"
                  }`}
                  style={{
                    left: `${(index / stages.length) * 100 + 50 / stages.length}%`,
                    width: `${100 / stages.length}%`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
