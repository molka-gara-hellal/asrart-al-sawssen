import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  title: string;
  body?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, body, action }: Props) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <Icon size={36} strokeWidth={1.2} className="text-rosegold" aria-hidden="true" />
      <h2 className="font-serif text-3xl">{title}</h2>
      {body && <p className="text-stone-warm">{body}</p>}
      {action}
    </div>
  );
}
