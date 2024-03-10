import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../store/reducers/postsReducer';
import TableData from '../../components/tabledata';
import { AuthContext } from '../../store/context/AuthContext';

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, status, error } = useSelector((state) => state.posts);
    const contextValue = useContext(AuthContext);
    let content;

    useEffect(() => {
        dispatch(fetchPosts())
    }, []);

    console.log(contextValue)

    if (status === "loading") {
        content = <div className="text-center my-5">Loading...</div>
    } else if (status === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => a?.title < b?.title ? -1 : 1)
        content = orderedPosts.map((post, i) => (
            <TableData key={i} post={post} />
        ))
    } else if (status === "failed") {
        content = (
            <>
                <h1>Posts not found</h1>
                <p className='text-center text-danger'>{error}</p>
            </>
        )
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Here are all the posts</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Posts