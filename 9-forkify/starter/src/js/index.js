import {elements, startLoader, stopLoader} from './views/base';

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List'; 
import Likes from './models/Likes'; 
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

/* Global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};

//* Search controller *\\
const controlSearch = async () => {
    // 1. get query from the view
    const query = searchView.getInput() 

    // 2. create new search object
    if (query) {

        // 3. new searc object and add to state
        state.search = new Search(query);

        // 4. prepare the viewer for results
        searchView.clearInput();
        searchView.clearResults();
        startLoader(elements.searchResults);

        try {
        // 5. search for recipes
        await state.search.getResults();

        // 6. Show results in UI
        stopLoader();
        searchView.renderResults(state.search.recipes);
        } catch (error) {
            alert('Oopsie, that didn\'t go as planned:(');
            stopLoader();
        };  
    };
};

// use search bar
elements.searchBar.addEventListener('submit', eventObject => {
    eventObject.preventDefault();
    controlSearch();
});

// click to next or previous page
elements.searchResultPages.addEventListener('click', eventObject => {
    const button = eventObject.target.closest('.btn-inline');
    
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    };
});

//* State recipe controller *\\

const controlRecipe = async () => {
    
    // get id from url    
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepare UI 
        recipeView.clearRecipe();
        startLoader(elements.recipe);

        // highlight selected recipe
        if (state.search) {
            searchView.highlightSelectedRecipe(id)};

        // create new recipe object
        state.recipe = new Recipe(id);

        // get recipe data and parse
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

        // calc servings and cooking time
        state.recipe.calcCookingTime();
        state.recipe.calcServings();
        
        // show recipe
        stopLoader();
        recipeView.showRecipe(
            state.recipe,
            state.likes.isLiked(id)
        );

        } catch (error) {
            alert('Sorry, something went wrong. Try again!');
        }    
    }
};

//* Shopping List controller *\\

const controlShoppingList = () => {
    // create a new list if there is no list available
    if (!state.list) state.list = new List();

    // Add each ingredient to shopping list and UI
    state.recipe.ingredients.forEach(element => {
        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update shopping list items event
elements.shoppingList.addEventListener('click', element => {
    const id = element.target.closest('.shopping__item').dataset.itemid;
    
    // handle delete button
    if (element.target.matches('.shopping__delete, .shopping__delete *')) {

        // handle delete from sate
        state.list.deleteItem(id);

        // handle delete for UI
        listView.deleteItem(id);

        // handle the count update
    } else if (element.target.matches('.shopping__count--value')) {       
    }
});

//* Like button controller *\\

const controlLike = () => {
    if(!state.likes) state.likes = new Likes()
    const currentID = state.recipe.id;

    // if recipe is not liked
    if (!state.likes.isLiked(currentID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image
        );

        // Toggle the like button -> liked
        likesView.toggleLikeButton(true);

        // Add liked recipe to favorite list
        likesView.showLikes(newLike);


    // recipe is liked
    } else {
        // remove like from state
        state.likes.deleteLike(currentID);

        // Toggle the like button -> not liked
        likesView.toggleLikeButton(false);

        // remove liked recipe from favorite list
        likesView.deleteLike(currentID);
    };
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

// Get liked recipes when the page (re)loads
window.addEventListener('load', () => {
    state.likes = new Likes();

    // get liked recipes
    state.likes.getData();

    // toggle favorite button 
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

    // Show existing likes
    state.likes.likes.forEach(like => likesView.showLikes(like));

});

//* Recipe controller - update servings & add to shopping list & favorites *\\
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', eventObject => {
    if(eventObject.target.matches('.btn-decrease, .btn-decrease *')){

        // if decrease button is clicked
         if (state.recipe.servings > 1) {
             state.recipe.updateServings('dec');
             recipeView.clearServings(state.recipe.servings);
             recipeView.updateServingsIngredients(state.recipe);
         }
    } else if (eventObject.target.matches('.btn-increase, .btn-increase *')){
        
        // if increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.clearServings(state.recipe.servings);
        recipeView.updateServingsIngredients(state.recipe);

    } else if (eventObject.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        
        // Add ingredients to shopping list
        controlShoppingList();
    } else if (eventObject.target.matches('.recipe__love, .recipe__love *')) {

        // Add to favorite list
        controlLike();

    }
});
