import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { BLOG_POSTS } from "../data/site.js";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-hero" style={{ '--page-hero-img': 'url(/assets/images/hero/hero-blog.webp)' }}>
          <div className="container page-hero__inner">
            <span className="eyebrow page-hero__eyebrow">Knowledge</span>
            <h1 className="page-hero__title">Blog</h1>
            <p className="page-hero__lede">
              Fabric guides, production notes and sourcing advice from the mill floor.
            </p>
          </div>
        </div>

        <section className="section blog-list" data-component="blog-list">
          <div className="container">
            {BLOG_POSTS.length === 0 ? (
              <p className="blog-empty">No posts yet â€?check back soon.</p>
            ) : (
              <ol className="blog-grid" reversed>
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug} className="blog-card" data-component="blog-card">
                    <span className="blog-card__meta mono">
                      <span className="blog-card__category">{post.category}</span>
                      <span aria-hidden="true"> Â· </span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </span>
                    <h2 className="blog-card__title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="blog-card__read mono"
                      aria-label={`Read: ${post.title}`}
                    >
                      Read article &rarr;
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
