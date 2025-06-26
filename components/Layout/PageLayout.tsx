import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function PageLayout({ title, children, actions }: PageLayoutProps) {
  return (
    <div className="flex-1 bg-purple-25 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}