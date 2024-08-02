import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllBlogs from './pages/AllBlogs/AllBlogs';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SinglePost from './pages/SinglePost/SinglePost';
import BlogArchive from './pages/BlogArchive/BlogArchive';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="content-container">
        <Routes>
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/" element={<BlogArchive />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
