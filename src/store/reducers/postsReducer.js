
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    post: {},
    status: "idle",
    error: "",
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(BASE_URL)
    return response?.data
})
export const fetchPostById = createAsyncThunk("post/fetchPost", async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response?.data
})

export const deletePost = createAsyncThunk("post/deletePost", async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})

const postsReducer = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // ==> normal reducer functions go here
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(fetchPostById.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.post = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action?.payload.id) {
                    console.log("could not delete");
                    console.log(action.payload)
                    return
                }

                const { id } = action.payload;
                const OldPosts = state.posts.filter(post =>
                    post.id !== id)
                state.posts = OldPosts
            })
    }
})

export const { } = postsReducer.actions;
export default postsReducer.reducer;