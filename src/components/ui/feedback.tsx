import React from "react";
import { XCircle, CheckCircle2, Info, AlertTriangle, AlertOctagon } from "lucide-react";

type FeedbackProps = {
  variant?: "warning" | "error" | "info" | "success";
  message?: string;
};

const Feedback: React.FC<FeedbackProps> = ({ variant, message }) => {
  const getIconAndColor = () => {
    let icon = null;
    let textColor = "";
    let bgColor = "";

    switch (variant) {
      case "error":
        textColor = "text-rose-600";
        bgColor = "bg-rose-600/20";
        icon = <AlertTriangle className={`h-3 w-3`} />;
        break;
      case "warning":
        textColor = "text-amber-600";
        bgColor = "bg-amber-600/20";
        icon = <AlertOctagon className={`h-3 w-3`} />;
        break;
      case "info":
        textColor = "text-blue-500";
        bgColor = "bg-blue-600/20";
        icon = <Info className={`h-3 w-3`} />;
        break;
      case "success":
        textColor = "text-emerald-500";
        bgColor = "bg-emerald-600/20";
        icon = <CheckCircle2 className={`h-3 w-3`} />;
        break;
      default:
        textColor = "text-slate-400";
        bgColor = "bg-slate-600/30";
        icon = <XCircle className={`h-3 w-3`} />;
        break;
    }

    return { icon, textColor, bgColor };
  };

  const { icon, textColor, bgColor } = getIconAndColor();

  return (
    <div className={`inline-flex items-center w-auto text-xs mt-1.5 ${bgColor} rounded ${textColor} p-[2px] px-2`}>
      {icon}
      { message ? (
        <span className="ml-1">{message}</span>
      ) : (<></>)}
    </div>
  );
};

export { Feedback };

