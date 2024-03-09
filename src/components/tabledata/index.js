import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { deletePost } from '../../store/reducers/postsReducer'

const TableData = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = post;

    const handleDelete = () => {
        try {
            // dispatch(deletePost({ id })).unwrap();
            dispatch(deletePost({ id }));
            navigate("/")
        } catch (error) {
            console.log(`Failed to delete the post ${error}`)
        }
    }

    return (
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
                <button className="btn btn-primary" onClick={() => {navigate(`/post/${id}/${post?.userId}/${post.title}`)}}>
                    View
                </button>
            </div>
        </div>
    )
}

export default TableData