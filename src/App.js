import { Fragment } from 'react';
import { Route, Routes } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Posts from './layout/Posts';
import PostDetail from './layout/postdetail';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id/:user/:title" element={<PostDetail />} />
      </Routes>
    </Fragment>
  );
}

export default App;
