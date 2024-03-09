import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, fetchPostById } from '../../store/reducers/postsReducer';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { post, status, error } = useSelector((state) => state.posts);
    let content;

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id))
        }
    }, [id]);


    const handleDelete = () => {
        try {
            // dispatch(deletePost({ id })).unwrap();
            dispatch(deletePost({ id }));
            navigate("/")
        } catch (error) {
            console.log(`Failed to delete the post ${error}`)
        }
    }

    if (status === "loading") {
        content = <div className="text-center my-5">Loading...</div>
    } else if (status === "succeeded") {
        content = (
            <div className="shadow p-3 mb-4 bg-white rounded border border-secondary">
                <div>
                    <h3>{post.title}</h3>
                    <p className="postCredit">
                        {post.body}
                    </p>
                </div>
                <div className='d-flex' style={{ gap: "10px" }}>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        )
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
                        <h3>Here are the post detail</h3>
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

export default PostDetail