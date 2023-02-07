import {getDataArray} from "./api.js";
import {renderProductList} from "./product-list.js";

const filterListElement = document.querySelector('.subcategory__list');
const filterTemplate = document.querySelector('#filter')
    .content
    .querySelector('.subcategory__item');

const renderFilterList = (filters) => {
    filterListElement.innerHTML = '';

    filters.filter((filter) => filter.id !== 6).forEach(({id, title}) => {
        const filterElement = filterTemplate.cloneNode(true);

        filterElement.dataset.id = id;
        filterElement.querySelector('.subcategory__title').textContent = title;
        filterListElement.append(filterElement);
    });
};

filterListElement.addEventListener('click', (evt) => {
    const filterElement = evt.target.closest('.subcategory__item');
    if (filterElement) {
        const id = +filterElement.dataset.id;
        renderProductList(getDataArray.products.filter((p) => p.category.id === id));

        document.querySelectorAll('.subcategory__item').forEach((item) => {
            item.classList.remove('active');
        });

        filterElement.classList.add('active');
    }
});

export {renderFilterList};
