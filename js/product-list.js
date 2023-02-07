const productListElement = document.querySelector('.product__row');
const productTemplate = document.querySelector('#product')
    .content
    .querySelector('.product__item');

const renderProductList = (products) => {
    productListElement.innerHTML = '';

    products.forEach((product) => {
        const productElement = productTemplate.cloneNode(true);
        const buttonElement = productElement.querySelector('.product__button');

        const countElement = buttonElement.querySelector('.product__counter');
        const state1Element = buttonElement.querySelector('.state-1');
        const state2Element = buttonElement.querySelector('.state-2');

        productElement.dataset.id = product.id;
        if (product.image_src) {
            productElement.querySelector('img.product__img').src = `uploads/products/${product.image_src}`;
        } else {
            productElement.querySelector('img.product__img').src = `img/about-barbecue.png`;
        }

        productElement.querySelector('.product__name').textContent = product.title;
        productElement.querySelector('.product__price span').textContent = product.price;

        if (JSON.parse(localStorage.getItem(product.id))) {
            state1Element.style.display = 'none';
            state2Element.style.display = 'flex';
            countElement.textContent = JSON.parse(localStorage.getItem(product.id)).count;
            buttonElement.classList.add('active');
        } else {
            state1Element.style.display = 'flex';
            state2Element.style.display = 'none';
        }

        productListElement.append(productElement);
    });
};

export {renderProductList};
