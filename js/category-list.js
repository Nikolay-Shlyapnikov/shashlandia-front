const categoryListElement = document.querySelector('.category__wrapper');
const categoryTemplate = document.querySelector('#category')
    .content
    .querySelector('.category__item');

const renderCategoryList = (categories) => {
    categoryListElement.innerHTML = '';

    categories.filter((c) => c.desc !== null).forEach(({title, desc, modifier}) => {
        const categoryElement = categoryTemplate.cloneNode(true);

        categoryElement.classList.add(`category__item--${modifier}`);
        categoryElement.querySelector('.category__item-title').textContent = title;
        categoryElement.querySelector('.category__item-text').textContent = desc;

        categoryListElement.append(categoryElement);
    });
};

export {renderCategoryList};
