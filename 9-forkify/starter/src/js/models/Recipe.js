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

    parseIngredients() {
        const unitsExtensive = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];


        const newIngredients = this.ingredients.map(ing => {
        // equalize unit ingredients
        let ingredient = ing.toLowerCase();
        
        unitsExtensive.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        });

        // remove ()
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        // parse ingrdients into calculation and unit 

        const ingredientsArray = ingredient.split(' ');
        const unitIndex = ingredientsArray.findIndex(ingIndex => units.includes(ingIndex));
        

        let objIng;
        if (unitIndex > -1){
            // there is a unit
            const arrayCount = ingredientsArray.slice(0, unitIndex);

            let count;
            if (arrayCount.length === 1) {
                count = eval(ingredientsArray[0].replace('-', '+'));
            } else {
                count = eval(ingredientsArray.slice(0, unitIndex).join('+'));
            }

            objIng = {
                count,
                unit: ingredientsArray[unitIndex],
                ingredient: ingredientsArray.slice(unitIndex + 1).join(' ')
            }
            
        } else if (parseInt(ingredientsArray[0], 10)) {
            // there is no unit but there is a number on first element
            objIng = {
                count: parseInt(ingredientsArray[0], 10),
                unit: '',
                ingredient: ingredientsArray.slice(1).join(' ') 
            }


        } else if (unitIndex === -1) {
            // there is no unit and no number
            objIng = {
                count: 1,
                unit: '',
                ingredient 
            }
        }
            return objIng;
        });       
        this.ingredients = newIngredients;
    }
}
        

