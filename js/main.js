import {getDataArray} from "./api.js";
import {renderProductList} from "./product-list.js";
import {renderFilterList} from "./filter.js";
import {renderCategoryList} from "./category-list.js";
import {setStorageInfo} from './storage.js';
import {updateHeaderCounter, updateProductCounter} from "./counter.js";
import {toggleBarbecueCounter} from "./counter.js";

const productListElement = document.querySelector('.product__row');

const init = (categories, products) => {
    renderCategoryList(categories);
    renderFilterList(categories);
    renderProductList(products);
};

getDataArray(
    [
        'http://localhost:80/categories',
        'http://localhost:80/products?page=1',
        'http://localhost:80/products?page=2',
        'http://localhost:80/products?page=3',
    ],
    ([categories, products1, products2, products3]) => {
        const products = products1.concat(products2, products3);
        init(categories, products);
        getDataArray.products = products;
    }
);

const headerBurgerButton = document.querySelector('.page-header__burger');
headerBurgerButton.addEventListener('click', (evt) =>{
    headerBurgerButton.classList.toggle('active');
    headerBurgerButton.previousElementSibling.classList.toggle('active');
});

productListElement.addEventListener('click', (evt) => {
    const buttonElement = evt.target.closest('.product__button');
    if (buttonElement) {
        const state1Element = buttonElement.querySelector('.state-1');
        const isFirstClick = state1Element.style.display === 'none';

        if (isFirstClick) {
            const productElement = evt.target.closest('.product__item');

            if (productElement) {
                const productId = +productElement.dataset.id;
                const productInfo = JSON.parse(localStorage.getItem(productId));
                updateProductCounter(productInfo, evt.target);
            }
        } else {
            setStorageInfo(buttonElement);
        }
    }
});

const servicesButton = document.querySelector('.services__button');
servicesButton.addEventListener('click', (evt) => {
    toggleBarbecueCounter(evt.target);
});

updateHeaderCounter();
