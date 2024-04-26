import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Recipe.css";
import { useNavigate } from "react-router-dom";

function Recipe() {
    const navigate = useNavigate();
  const supabaseUrl = "https://hsrgzxhokvqzbeuohryq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzcmd6eGhva3ZxemJldW9ocnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NDExMjQsImV4cCI6MjAyOTExNzEyNH0.DpsydqZY2g5tikhyCAgq_RInBmaSxz1ipV_5Kcbk7sY";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [urlPicture, setUrlPicture] = useState("");
  console.log("here");

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Recipe")
      .insert([{ name, ingredients, preparation, urlPicture }]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      navigate("/");
    }
  }

  return (
    <div className="recipe-container">
      <h1>New recipe</h1>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name"></label>
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ingredients"></label>
          <textarea
            id="ingredients"
            className="input-field"
            value={ingredients}
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="preparation"></label>
          <textarea
            id="preparation"
            className="input-field"
            placeholder="Preparation"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="urlPicture"></label>
          <input
            id="urlPicture"
            type="text"
            className="input-field"
            placeholder="Picture URL"
            value={urlPicture}
            onChange={(e) => setUrlPicture(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Create a post{" "}
        </button>
      </form>
    </div>
  );
}
export default Recipe;
