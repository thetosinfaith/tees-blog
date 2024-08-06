import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sanityClient from "../../sanityClient";
import BlockContent from "@sanity/block-content-to-react";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); 
  const { slug } = useParams();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log("Fetching data for slug:", slug);
    sanityClient
      .fetch(
        `*[slug.current == $slug] {
          title,
          body,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          publishedAt,
          "name": author->name,
        }`,
        { slug }
      )
      .then((data) => {
        console.log("Fetched data:", data);
        setSinglePost(data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return <div style={spinnerStyle}>Loading...</div>;
  }

  if (!singlePost) {
    return <div>No post found</div>;
  }

  const postTitleStyle = {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '2rem',
    textAlign: 'center',
    width: isSmallScreen ? '300px' : '600px', 
    display: 'block'
  };

  return (
    <section style={postSectionStyle}>
      <button style={backButtonStyle}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Go back</Link>
      </button>
      <div style={titleContainerStyle}>
        <h1 style={postTitleStyle}>{singlePost.title}</h1>
        {singlePost.publishedAt && (
          <small style={postDateStyle}>
            By {singlePost.name} on{" "}
            {new Date(singlePost.publishedAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
        )}
      </div>
      {singlePost.mainImage && singlePost.mainImage.asset && (
        <div style={imageContainerStyle}>
          <div style={postImageStyle}>
            <img
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
              style={imageStyle}
            />
          </div>
        </div>
      )}
      <div style={postContentStyle}>
        <BlockContent
          blocks={singlePost.body}
          projectId="dr3oba85" 
          dataset="production" 
          className="block-content"
        />
      </div>
    </section>
  );
};

const postSectionStyle = {
  padding: '1.25rem',
  maxWidth: '72rem',
  margin: '0 auto',
  paddingBottom: '5rem'
};

const backButtonStyle = {
  marginTop: '30px',
  backgroundColor: 'black',
  color: 'white',
  transition: 'all 0.5s',
  padding: '0.5rem',
  fontSize: '0.875rem',
  borderRadius: '0.375rem'
};

const spinnerStyle = {
  width: '50%',
  margin: '1.25rem auto'
};

const titleContainerStyle = {
  display: 'flex',
  flexDirection: 'column', 
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10%',
};

const postDateStyle = {
  fontSize: '0.875rem',
  display: 'block', 
  textAlign: 'center',
  marginTop: '5%',
  marginBottom: '20px',
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '5%'
};

const postImageStyle = {
  width: '1200px',
  height: '500px'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.375rem'
};

const postContentStyle = {
  width: '100%',
  textAlign: 'justify',
  lineHeight: '1.75',
  marginTop: '7%',
  padding: '5%',
};

export default SinglePost;
