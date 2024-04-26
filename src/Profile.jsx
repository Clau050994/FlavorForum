import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate(); 
  const location = useLocation();
  const recipe = location.state;
  const [name, setName]  = useState(recipe?.name);
  const [ingredients, setIngredients ]= useState(recipe?.ingredients);
  const [ preparation, setPreparation ] = useState(recipe?.preparation);
  const [ urlPicture, setUrlPicture ] = useState(recipe?.urlPicture);
  console.log(recipe.in);
  const id = recipe?.id;
  const supabaseUrl = "https://hsrgzxhokvqzbeuohryq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzcmd6eGhva3ZxemJldW9ocnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NDExMjQsImV4cCI6MjAyOTExNzEyNH0.DpsydqZY2g5tikhyCAgq_RInBmaSxz1ipV_5Kcbk7sY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function handleSubmit(event) {
    await handleUpdate(event);
    return;
  }

  async function handleUpdate(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Recipe")
        .update([{ name, ingredients, preparation, urlPicture }])
        .match({ id });
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(data);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Recipe")
        .delete()
        .match({ id });
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(data);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="recipe-container">
      <h1>Update your recipe</h1>
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
            
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="preparation"></label>
          <textarea
            id="preparation"
            className="input-field"
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
            value={urlPicture}
            onChange={(e) => setUrlPicture(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Update Recipe</button>
        <button type="delete" onClick={handleDelete}>Delete Recipe </button>
      </form>
    </div>
  );
}
export default Profile;
