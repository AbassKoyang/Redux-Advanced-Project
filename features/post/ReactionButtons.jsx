import { useAddReactionMutation} from "./postSlice";


const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤",
    rocket: "🚀",
    coffee: "☕",
}
const ReactionButtons = ({post}) => {
    const [addReaction] = useAddReactionMutation();

    const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reaction-button"
                onClick={() => {
                    const newValue = post.reactions[name] + 1;
                    addReaction({postId: post.id, reactions:{ ...post.reactions, [name]: newValue}})
                }}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div className="reaction-buttons-con">{reactionButtons}</div>
}

export default ReactionButtons