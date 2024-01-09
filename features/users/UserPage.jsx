import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { useGetPostsByUserIdQuery } from "../post/postSlice";
import { useParams, Link } from "react-router-dom";
import '../users/users.css';

const UserPage = () => {
  const {userId} = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  
  const {
    data: postForUser,
    isLoading,
    isSuccess,
    isError,
    error,
} = useGetPostsByUserIdQuery(userId);


  let content;
    if(isLoading) {
        content = <p>Loading...</p>;
    } else if(isSuccess){
      const {ids, entities} = postForUser;
        content = ids.map(id => {
          return(
            <li key={id} className="list-items">
              <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
          )
        });
    } else if(isError){
        content = <p>{error}</p>;
    }

  return (
    <section className="users-con">
      {user?.name}
      <ol>
        {content}
      </ol>
    </section>
  )
}

export default UserPage;