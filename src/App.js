import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Posts from './layout/Posts';
import PostDetail from './layout/postdetail';
import { fetchContent } from './store/reducers/contentReducer';
import { AuthContext } from './store/context/AuthContext';
// import ReactDOM from 'react-dom';

// class Modal extends React.Component {
//   render() {
//     return ReactDOM.createPortal(
//       this.props.children,
//       document.getElementById('modal-root')
//     );
//   }
// }

// const Modal = ({ children }) => {
//   const modalRoot = document.getElementById('modal-root');
//   return ReactDOM.createPortal(
//     children,
//     modalRoot
//   );
// };

function App() {
  const dispatch = useDispatch()
  // const { posts } = useSelector((state) => state.persisted);
  const { contents, isLoading, error } = useSelector((state) => state.content);
  const [contextValue, setContextValue] = useState("Hello from Context");

  useEffect(() => {
    dispatch(fetchContent());
  }, []);

  return (
    <Fragment>
      <AuthContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:id/:user/:title" element={<PostDetail />} />
        </Routes>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;


// import React, { useState, useCallback } from 'react';

// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = useCallback(() => {
//     setCount(prevCount => prevCount + 1);
//   }, []);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <ChildComponent onIncrement={increment} />
//     </div>
//   )
// };

// export default App

// const ChildComponent = React.memo(({ onIncrement }) => {
//   console.log("click")
//   return (
//     <button onClick={onIncrement} className='btn btn-primary'>Increment</button>
//   );
// });



// import React, { useState, useMemo } from 'react';

// const App = () => {
//   const [count, setCount] = useState(0);

//   const expensiveComputation = useMemo(() => {
//     return count * 2;
//   }, [count]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <p>Result of expensive computation: {expensiveComputation}</p>
//       <button onClick={() => setCount(prevCount => prevCount + 1)} className='btn btn-primary'>Increment</button>
//     </div>
//   );
// };

// export default App;

