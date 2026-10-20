import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, linkTo, linkLabel, as: Tag = "h2" }: Props) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Tag className="font-serif text-4xl leading-tight sm:text-5xl">{title}</Tag>
      </div>
      {linkTo && linkLabel && (
        <Link to={linkTo} className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
          {linkLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
