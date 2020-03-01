import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, startLoader, stopLoader} from './views/base';
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

        // 5. search for recipes
        await state.search.getResults();

        // 6. Show results in UI
        // console.log(state.search.recipes);
        stopLoader();
        searchView.renderResults(state.search.recipes);
      
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








