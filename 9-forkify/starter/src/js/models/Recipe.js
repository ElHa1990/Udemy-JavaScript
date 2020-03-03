import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.ingredients = result.data.recipe.ingredients;          
            this.url = result.data.recipe.source_url;
            
            console.log(result);
        } catch(error) {
            console.log(error);
            alert('Oops, something went wrong. Try again!')
        }
    }

    calcCookingTime() {
        // assuming that every 3 ingredients need 15 min to cook.    
        const numberOfIngredients = this.ingredients.length;
        const time = Math.ceil(numberOfIngredients / 3);
        this.cookTime = time * 15;
    }

    calcServings () {
        this.servings = 4;
    }
}
