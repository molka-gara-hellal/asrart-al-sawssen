import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t.meta.notFoundTitle);
  return (
    <div className="container-x">
      <EmptyState
        icon={SearchX}
        title={t.common.notFound}
        body={t.common.notFoundBody}
        action={<Link to="/" className="btn-primary">{t.common.home}</Link>}
      />
    </div>
  );
}
