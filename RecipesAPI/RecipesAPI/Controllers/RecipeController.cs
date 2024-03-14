using Microsoft.AspNetCore.Mvc;
using myApi;

namespace RecipesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private static List<Recipe> recipes = new List<Recipe>()
        {
#region initialize
              new Recipe
            {
                RecipeCode = 1,
                RecipeName = "Chocolate Cake",
                CategoryCode = 1,
                PreparationTimeMinutes = 140,
                Level = 3,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
                Instructions = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
                UserCode ="password123",
                Image = "https://bordo.org.il/wp-content/uploads/2022/01/%D7%9B%D7%A8%D7%95%D7%91%D7%99%D7%AA-%D7%9E%D7%98%D7%95%D7%92%D7%A0%D7%AA.jpg"
            },
                        new Recipe
            {
                RecipeCode = 1,
                RecipeName = "Chocolate Cake",
                CategoryCode = 1,
                PreparationTimeMinutes = 140,
                Level = 3,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
                Instructions = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
                UserCode = "123",
                Image = "https://www.ozrothagalil.org.il/wp-content/uploads/2020/08/PHOTO-2020-08-25-18-07-07.jpg"
            },

        new Recipe
            {
                RecipeCode = 2,
                RecipeName = "Vegetable Stir-Fry",
                CategoryCode = 2,
                PreparationTimeMinutes = 30,
                Level = 2,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Broccoli", "Carrots", "Bell Peppers", "Onions", "Garlic", "Soy Sauce" },
                Instructions = new List<string> { "Chop vegetables", "Stir-fry in hot oil", "Add sauce", "Cook until tender" },
                UserCode ="123",
                Image = "https://www.kosherest.co.il/uploads/i/inehmad/Fotolia_140038001_XS_ccafb~.jpg"
            },
            new Recipe
            {

                RecipeCode = 1,
                RecipeName = "Chocolate Cake",
                CategoryCode = 1,
                PreparationTimeMinutes = 140,
                Level = 3,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
                Instructions = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
                UserCode ="123",
                Image = "https://bordo.org.il/wp-content/uploads/2022/01/%D7%9B%D7%A8%D7%95%D7%91%D7%99%D7%AA-%D7%9E%D7%98%D7%95%D7%92%D7%A0%D7%AA.jpg"
            },

        new Recipe
            {
                RecipeCode = 2,
                RecipeName = "Vegetable Stir-Fry",
                CategoryCode = 2,
                PreparationTimeMinutes = 30,
                Level = 2,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Broccoli", "Carrots", "Bell Peppers", "Onions", "Garlic", "Soy Sauce" },
                Instructions = new List<string> { "Chop vegetables", "Stir-fry in hot oil", "Add sauce", "Cook until tender" },
                UserCode = "123",
                Image = "https://www.kosherest.co.il/uploads/i/inehmad/Fotolia_140038001_XS_ccafb~.jpg"
            },
                      new Recipe
            {
                RecipeCode = 1,
                RecipeName = "Chocolate Cake",
                CategoryCode = 1,
                PreparationTimeMinutes = 140,
                Level = 3,
                DateAdded = DateTime.Now,
                Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
                Instructions = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
                UserCode = "123",
                Image = "https://www.ozrothagalil.org.il/wp-content/uploads/2020/08/PHOTO-2020-08-25-18-07-07.jpg"
            },


      new Recipe
       {
    RecipeCode = 3,
    RecipeName = "Spaghetti Carbonara",
    CategoryCode = 3,
    PreparationTimeMinutes = 70,
    Level = 2,
    DateAdded = DateTime.Now,
    Ingredients = new List<string> { "Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Garlic", "Salt", "Pepper" },
    Instructions = new List<string> { "Boil spaghetti", "Cook bacon until crispy", "Mix eggs, cheese, garlic, salt, and pepper", "Toss pasta with egg mixture" },
    UserCode = "123",
    Image = "https://www.animalshop.co.il/images/itempics/uploads/media_23062019150926.jpg?rnd=.1262781?rnd=0.8749624067087183"
}
	#endregion
          
        };

        public RecipeController()
        {
            // Add sample recipes


        }
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }
        [HttpGet("{id}")]
        public ActionResult<Recipe> Get(int id)
        {
            var recipe = recipes.Find(u => u.RecipeCode == id);
            if (recipe == null)
            {
                return NotFound();
            }
            return recipe;
        }

        [HttpPost]
        public void Post([FromBody] Recipe recipe)
        {
            recipes.Add(recipe);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe updatedRecipe)
        {
            var recipe = recipes.Find(r => r.RecipeCode == id);
            if (recipe != null)
            {
                recipe.RecipeName = updatedRecipe.RecipeName;
                recipe.CategoryCode = updatedRecipe.CategoryCode;
                recipe.PreparationTimeMinutes = updatedRecipe.PreparationTimeMinutes;
                recipe.Level = updatedRecipe.Level;
                recipe.Ingredients = updatedRecipe.Ingredients;
                recipe.Instructions = updatedRecipe.Instructions;
                recipe.UserCode = updatedRecipe.UserCode;
                recipe.Image = updatedRecipe.Image;
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var recipe = recipes.Find(r => r.RecipeCode == id);
            if (recipe != null)
            {
                recipes.Remove(recipe);
            }
        }
    }
}
