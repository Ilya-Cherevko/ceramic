// src/Components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, noindex, url, type = "website" }) => {
  const siteTitle = "VOK Ceramic";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultImage = "https://vokceramic.ru/og-image.jpg";
  const siteUrl = "https://vokceramic.ru";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || "Керамическая плитка, керамогранит и гибкий мрамор от VOK Ceramic"} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || "Керамическая плитка, керамогранит и гибкий мрамор от VOK Ceramic"} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || "Керамическая плитка, керамогранит и гибкий мрамор от VOK Ceramic"} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical */}
      <link rel="canonical" href={url || siteUrl} />
    </Helmet>
  );
};

export default SEO;