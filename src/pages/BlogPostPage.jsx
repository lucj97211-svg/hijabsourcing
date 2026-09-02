import React from "react";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { BLOG_POSTS, CONTACT } from "../data/site.js";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* Minimal Markdown-to-JSX: handles ## headings and paragraph breaks only.
   Extend this parser when richer formatting is needed. */
function renderBody(body) {
  const blocks = body.trim().split(/\n{2,}/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i} className="post-body__h2">{block.slice(3)}</h2>;
    }
    return <p key={i}>{block}</p>;
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <SiteHeader />
        <main>
          <div className="page-hero">
            <div className="container page-hero__inner">
              <h1 className="page-hero__title">Article not found</h1>
            </div>
          </div>
          <section className="section">
            <div className="container-narrow">
              <p>This article does not exist or may have been moved.</p>
              <Link to="/blog" className="btn btn--outline" style={{ marginTop: "2rem", display: "inline-block" }}>
                Back to Blog
              </Link>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <article className="post" data-component="blog-post">
          <header className="post-header">
            <div className="container-narrow">
              <Link to="/blog" className="post-header__back mono">&larr; Blog</Link>
              <span className="post-header__meta mono">
                <span className="post-header__category">{post.category}</span>
                <span aria-hidden="true"> · </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <h1 className="post-header__title">{post.title}</h1>
              <p className="post-header__excerpt">{post.excerpt}</p>
            </div>
          </header>

          <div className="post-body section">
            <div className="container-narrow">
              {renderBody(post.body)}
            </div>
          </div>

          <footer className="post-footer section section--tint">
            <div className="container-narrow post-footer__inner">
              <p className="post-footer__cta-label eyebrow">Ready to start?</p>
              <h2 className="post-footer__cta-title">Talk to the mill directly.</h2>
              <p>
                Send your fabric, weight target and quantity to{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> — we come back with a
                quote and a dated schedule, usually within one business day.
              </p>
              <Link to="/contact" className="btn btn--solid" style={{ marginTop: "1.5rem", display: "inline-block" }}>
                Request a Quote
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
