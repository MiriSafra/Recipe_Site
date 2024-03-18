namespace myApi
{
    public class Recipe
    {
        public int RecipeCode { get; set; }
        public string RecipeName { get; set;}
        public int CategoryCode { get; set; }
        public int PreparationTimeMinutes { get; set; }
        public int Level { get; set;}
        public DateTime DateAdded { get; set;}
        public List<string> Ingredients { get; set;}
        public List<string> Instructions { get; set; }
        public string UserCode { get; set; }
        public string Image { get; set; }
    }
   
}
