import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string, description?: string, isHome = false): void {
  useEffect(() => {
    document.title = isHome ? title : `${title} | ${siteConfig.brand.name}`;

    const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
    }
    setMeta('meta[property="og:title"]', "property", "og:title", document.title);
  }, [title, description, isHome]);
}
