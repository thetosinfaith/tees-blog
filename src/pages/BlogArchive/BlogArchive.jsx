import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import MainSection from "../../components/MainSection/MainSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { format } from "date-fns";
import sanityClient from "../../sanityClient";
import "./BlogArchive.css";

function BlogArchive() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"] {
        title,
        slug,
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt,
        },
        tags
      } | order(publishedAt desc)`)
      .then((data) => {
        setPosts(data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load posts. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderBody = (body) => {
    if (typeof body === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: body }} />;
    }
    return <div>Content not available</div>;
  };

  console.log("Posts:", posts);

  return (
    <>
      <MainSection />
      <section className="blog-archive-section">
        {isLoading ? (
          <div className="spinner"></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.slug.current} className="post-card">
                  <Link to={`/blog/${post.slug.current}`}>
                    {post.mainImage?.asset?.url ? (
                      <LazyLoadImage
                        src={post.mainImage.asset.url}
                        lazy="loading"
                        effect="blur"
                        alt={post.mainImage.alt || 'Post Image'}
                        className="post-image"
                      />
                    ) : (
                      <div className="placeholder-image">No Image Available</div>
                    )}
                  </Link>
                  <p className="post-date">
                    {format(new Date(post.publishedAt), "dd MMMM yyyy")}
                  </p>
                  <h4 className="post-title">
                    {post.title}
                  </h4>
                  <Link to={`/blog/${post.slug.current}`} className="read-more-link">
                    <span className="read-more-button">
                      <FiArrowUpRight />
                    </span>
                  </Link>
                  <div className="post-body">
                    {renderBody(post.body)}
                  </div>
                  <div className="post-tags">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag, id) => (
                        <div key={id}>
                          <label className="post-tag">
                            {typeof tag === 'object' ? tag.name : tag}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div>No tags available</div>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div>No posts available</div>
            )}
          </div>
        )}
        <div className="view-more-container">
          <Link to="/allblogs">
            <button className="view-more-button">
              View more posts
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default BlogArchive;
