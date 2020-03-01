// All DOM elements

export const elements = {
    searchBar: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    searchResultPages: document.querySelector(".results__pages")
};

export const elementStrings = {
    loader: 'loader'
    
}

export const startLoader = parent => {
    const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>    
            </svg>
        </div>`;
        parent.insertAdjacentHTML('afterbegin', loader)
};

export const stopLoader = () =>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};