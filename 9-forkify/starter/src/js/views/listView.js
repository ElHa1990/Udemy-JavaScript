import {elements} from './base';

export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemID = ${item.id}>    
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" min = 0 class = "shopping_count--value">
                    <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
                <button class="shopping__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
        </li>
    `; elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemID = "${id}"]`); // vraag Eelco! Hoe werkt dit laatste stukje? Verwijst naar hierboven
    const test = item.parentElement.removeChild(item);
};
