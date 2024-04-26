import "./App.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import supabaseClient from "./SupabaseClient";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate("/recipe-details", { state: { recipe } });
  };

  // Create a date object from the timestamp string
  const dateObject = new Date(recipe.created_at);

  // Convert to local time
  const localDate = dateObject.toLocaleDateString(); // format: MM/DD/YYYY
  const localTime = dateObject.toLocaleTimeString(); // format: HH:MM:SS AM/PM

  RecipeCard.propTypes = {
    recipe: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      urlPicture: PropTypes.string.isRequired,
      ingredients: PropTypes.string.isRequired,
      preparation: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
    }).isRequired,
  };

  return (
    <div onClick={navigateToDetails} key={recipe.id} className="recipe-card">
      <h2 className="recipe-title">{recipe.name}</h2>
      <img
        className="recipe-image"
        src={recipe.urlPicture.replace(/^"+|"+$/g, "")}
        alt={recipe.name}
        width={200}
      />
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <p style={{ color: "black", fontSize: 15 }}>
          {localDate} - {localTime}
        </p>
        <p
          style={{
            color: "white",
            fontSize: 15,
            paddingRight: 5,
            paddingLeft: 5,
            backgroundColor: "gray",
            borderRadius: 10,
          }}
        >
          upvotes: {recipe.upvotes}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  async function fetchRecipes(search = "") {
    let query = supabaseClient.from("Recipe").select();

    if (search) {
      query = query.ilike("name", `%${search}%`); // ilike for case-insensitive matching
    }

    const { data, error } = await query;
    if (error) {
      console.log("Error fetching recipes:", error);
      setRecipes([]); // Clear recipes on error
    } else {
      setRecipes(data);
    }
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRecipes(searchTerm);
  };

  useEffect(() => {
    // Sort recipes whenever sortKey or sortOrder changes
    const sortArray = (type, order) => {
      const types = {
        name: "name",
        created_at: "created_at",
        upvotes: "upvotes",
      };
      const sortProperty = types[type];
      const sorted = [...recipes].sort((a, b) => {
        if (a[sortProperty] < b[sortProperty]) return order === "asc" ? -1 : 1;
        if (a[sortProperty] > b[sortProperty]) return order === "asc" ? 1 : -1;
        return 0;
      });
      setRecipes(sorted);
    };

    sortArray(sortKey, sortOrder);
  }, [sortKey, sortOrder]);

  const handleSortKeyChange = (event) => {
    setSortKey(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    fetchRecipes(); // Fetch all if no search term
  }, []); // Effect runs on searchTerm change

  return (
    <div className="App">
      <div className="page-header">
        <h1>Recipes</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="navbar-search"
            placeholder="Search by name"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <select onChange={handleSortKeyChange} value={sortKey}>
            <option value="created_at">Sort by Date Created</option>
            <option value="upvotes">Sort by Upvotes</option>
            <option value="name">Sort by Name</option>
          </select>
          <select onChange={handleSortOrderChange} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="cards-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <p>No recipes found!</p>
        )}
      </div>
    </div>
  );
}

export default App;
