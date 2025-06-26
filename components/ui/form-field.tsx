import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, description, className, id, ...props }, ref) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "flex h-10 w-full rounded-md px-3 py-2 text-sm",
            "border border-gray-300 bg-white",
            "placeholder:text-gray-400",
            "transition-all duration-200 ease-in-out",
            "hover:border-gray-400",
            "focus:outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-600/10",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {description && !error && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";