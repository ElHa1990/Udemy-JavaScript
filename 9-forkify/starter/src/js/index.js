import {elements, startLoader, stopLoader} from './views/base';

import Search from './models/Search';
import * as searchView from './views/searchView';

import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';

/* Global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};

// search controller
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
    const button = eventObject.target.closest('.btn-inline')
    console.log(button);

    
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
        console.log(goToPage);
    }
});


// recipe controller

const controlRecipe = async () => {
    
    // get id from url    
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare UI 
        recipeView.clearRecipe();
        startLoader(elements.recipe);

        // highlight selected recipe
        if (state.search) {
            searchView.highlightSelectedRecipe(id)};

        // create new recipe object
        state.recipe = new Recipe(id);
        window.r = state.recipe;
        // console.log(window.r);

        // get recipe data and parse
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

        // calc servings and cooking time
        state.recipe.calcCookingTime();
        state.recipe.calcServings();
        
        // show recipe
        stopLoader();
        recipeView.showRecipe(state.recipe);

        } catch (error) {
            alert('Sorry, something went wrong. Try again!');
        }    
    }
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
