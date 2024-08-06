import React, { useState, useEffect } from "react";
import sanityClient from "../../sanityClient";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { format } from "date-fns";
import './AllBlogs.css';

function Allblog () {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] {
          title,
          slug,
          body,
          description,
          tags,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          "name": author -> name,
        } | order(publishedAt desc)`
      )
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="blog-section">
        <h1 className="blog-title">All Blog Posts</h1>
        {isLoading ? (
          <div className="spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug.current} className="post-card">
                  <Link to={`/blog/${post.slug.current}`}>
                    <LazyLoadImage
                      src={post.mainImage?.asset?.url}
                      lazy="loading"
                      effect="blur"
                      alt={post.title || 'Post Image'}
                      className="post-image"
                    />
                  </Link>
                  <div className="post-info">
                    <div className="post-header">
                      <p>{format(new Date(post.publishedAt), "dd MMMM yyyy")}</p>
                      <Link to={`/blog/${post.slug.current}`} className="read-more-link">
                        <button className="read-more-button">
                          <FiArrowUpRight />
                        </button>
                      </Link>
                    </div>
                    <h4 className="post-title">{post.title || 'No Title'}</h4>
                    <p className="post-description">{post.description || 'No Description'}</p>
                    <div className="post-tags">
                      {post.tags && post.tags.length > 0 ? (
                        post.tags.map((item, id) => (
                          <div key={id} className="post-tag">
                            <label>{item}</label>
                          </div>
                        ))
                      ) : (
                        <div>No Tags</div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No posts available</div>
            )}
          </div>
        )}
        {posts.length > 0 && (
          <div className="go-home-button-container">
            <button className="go-home-button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Allblog;
