import { Link, useLocation } from "react-router-dom";
import supabaseClient from "./SupabaseClient";
import { useState } from "react";

export default function RecipeDetails() {
  const { state } = useLocation();
  const { recipe } = state;
  const [upvotes, setUpvotes] = useState(recipe.upvotes);
  const [comments, setComments] = useState(recipe.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleUpvote = async () => {
    const newUpvotes = upvotes + 1;
    setUpvotes(newUpvotes);

    const { error } = await supabaseClient
      .from("Recipe")
      .update({ upvotes: newUpvotes })
      .match({ id: recipe.id });

    if (error) {
      console.error("Error updating upvotes:", error);
      setUpvotes(upvotes); // revert if there was an error
    }
  };

  const handleCommentSubmit = async () => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment("");

    const { error } = await supabaseClient
      .from("Recipe")
      .update({ comments: updatedComments })
      .match({ id: recipe.id });

    if (error) {
      console.error("Error updating comments:", error);
      setComments(comments); // revert if there was an error
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "15%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "black",
      }}
    >
      <h1>{recipe.name}</h1>
      <img
        src={recipe.urlPicture.replace(/^"+|"+$/g, "")}
        alt={recipe.name}
        width="300"
      />
      <p>Created on: {new Date(recipe.created_at).toLocaleString()}</p>
      <p>Upvotes: {upvotes}</p>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          onClick={handleUpvote}
          className="custom-button"
          style={{ marginRight: 10 }}
        >
          <p>Upvote</p>
        </div>
        <div className="custom-button">
          <Link to={{ pathname: "/profile" }} state={recipe}>
            Edit
          </Link>
        </div>
      </div>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Preparation</h3>
      <p>{recipe.preparation}</p>
      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <p key={index}>- {comment}</p>
      ))}
      <input
        type="text"
        style={{ width: '70%', padding: 10, color: 'white', marginBottom: 10 }}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
}
