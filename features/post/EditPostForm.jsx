import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postSlice";
import '../post/posts.css'

const EditPostForm = () => {
    const [updatePost, {isLoading}] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const {postId} = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
               await  updatePost({id: post.id, title, body: content, userId, reactions: post.reactions}).unwrap();
            
                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error('Failed to save post:', error)
            }
        }
    }
    const onDeletePostClicked = async () => {
            try {
                deletePost({id: post.id,}).unwrap();
            
                setTitle('');
                setContent('');
                setUserId('');
                navigate('/')
            } catch (error) {
                console.error('Failed to delete post:', error)
            }
    }
    const usersOptions = users.map((user) => {
        return(
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        )
    })
    return (
        <section className="add-post-con">
            <h2>Edit post</h2>
            <form className="post-form">
                <label htmlFor="title">Post title</label>
                <input 
                    type="text" 
                    name="title"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="author">Author</label>
                <select name="author" id="author" defaultValue={userId} value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="content">Post content</label>
                 <textarea 
                    type="text" 
                    name="content"
                    value={content}
                    onChange={onContentChanged} 
                    cols="30" 
                    rows="10"></textarea>
                <button
                    className="save-button"
                    type="button"
                    disabled={!canSave}
                    onClick={onSavePostClicked}
                >Save Post</button>
                <button
                    className="delete-button"
                    type="button"
                    onClick={onDeletePostClicked}
                >Delete Post</button>
            </form>
        </section>
    )
}

export default EditPostForm;