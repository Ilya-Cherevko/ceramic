import React from "react";
import SEO from "../Components/SEO";
import { SEO as SEOMeta } from "../utils/seo";

export default function NotPage() {
  return (
    <div className="not-page">
      <SEO
        title={SEOMeta.notFound.title}
        description={SEOMeta.notFound.description}
        keywords={SEOMeta.notFound.keywords}
        noindex={true}
      />
      <h1>404</h1>
      <p>Страница не найдена</p>
    </div>
  );
}