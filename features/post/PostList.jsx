import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery} from "./postSlice";
import '../post/posts.css'
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
    const orderedPostIds = useSelector(selectPostIds);

    const {
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery;
    
    let content;
    if(isLoading) {
        content = <p>Loading...</p>;
    } else if(isSuccess){
        content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId}/>);
    } else if(isError){
        content = <p>{error}</p>;
    }


  return (
    <section className="posts-con">
        {content}
    </section>
  )
}

export default PostList;