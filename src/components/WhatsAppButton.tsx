import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  label: ReactNode;
  /** Use href for a plain link (contact page) or onClick to validate first (bag, product page). */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function WhatsAppButton({ label, href, onClick, disabled, className = "" }: Props) {
  const content = (
    <>
      <MessageCircle size={18} aria-hidden="true" />
      {label}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`btn-whatsapp ${className}`}>
      {content}
    </button>
  );
}
