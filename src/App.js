import { Fragment, useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Posts from './layout/Posts';
import PostDetail from './layout/postdetail';
import { fetchContent } from './store/reducers/contentReducer';

function App() {
  const dispatch = useDispatch()
  // const { posts } = useSelector((state) => state.persisted);
  const { contents, isLoading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, []);

  console.log(contents, isLoading, error)
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
