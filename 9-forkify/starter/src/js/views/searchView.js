import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ' ';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML= ' ';
    elements.searchResultPages.innerHTML= ' ';
};

export const highlightSelectedRecipe = id => {

    const resultsArray = Array.from(document.querySelector('.results__link'));
    resultsArray.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active')
}

function limitTitle(title, limit = 17) {
    let newTitle = "";
        if (title.length > limit) {
              newTitle = `${title.substr(0, 17)}...`;
        } else {
            newTitle = title;
        }
           
    return newTitle;
}


const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `    
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
            <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
            </svg>
            
        </button>`

const getButtons = (page, numberOfResults, resultsPerPage) => {
    const pages = Math.ceil(numberOfResults / resultsPerPage);

    let button; 
    if (page ===1 && pages >1) {
        // button go next page
        button = createButton(page, 'next')

    } else if (page === pages && pages > 1) {
        // button go to previous page
        button = createButton(page, 'prev')

    } else {
        //show previous and next page
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // determine needed pages    
    const start = (page - 1) * resultsPerPage;
    const end = resultsPerPage * page;

    recipes.slice(start, end).forEach(renderRecipe);

    // show buttons
    getButtons(page, recipes.length, resultsPerPage);
};