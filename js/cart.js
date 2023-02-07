import {getDataArray} from "./api.js";
import {deleteCartProduct, updateCartProductCounter, updateHeaderCounter, updateOrderResult} from "./counter.js";
import { setOrderFormSubmit } from "./order-form.js";

const BARBECUE_MAN_ID = 51;
const cartProductList = document.querySelector('.cart__product-wrapper');
const cartProductTemplate = document.getElementById('cart-product')
    .content
    .querySelector('.cart__product');

const renderCartProductList = (products) => {
    cartProductList.innerHTML = '';

    const cartProducts = [];
    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    console.log(keys);
    for(const key of keys) {
        cartProducts.push(JSON.parse(localStorage.getItem(key)));
    }

    if (cartProducts.length) {
        cartProducts.forEach((cartProduct) => {
            const product = products.find((product) => product.id === cartProduct.id);
            product.count = cartProduct.count;
            const cartProductElement = cartProductTemplate.cloneNode(true);
    
            if (product.image_src) {
                const imageElement = cartProductElement.querySelector('.cart__product-image img');
                imageElement.src = `/uploads/products/${product.image_src}`;
            }
    
            cartProductElement.dataset.id = product.id;
            cartProductElement.querySelector('.cart__product-name').textContent = product.title;
            cartProductElement.querySelector('.cart__product-weight').textContent = product.weight;
            cartProductElement.querySelector('.cart__product-price').textContent = product.price;
            cartProductElement.querySelector('.product__counter').textContent = product.count;
    
            if (product.id === BARBECUE_MAN_ID) {
                cartProductElement.style.border = '2px solid red';
                cartProductElement.style.boxSizing = 'border-box';
                cartProductElement.querySelector('.cart__product-count').innerHTML = '';
            }

            cartProductList.append(cartProductElement);
            document.querySelectorAll('section').forEach((s) => s.style.display = 'block');
        });
    } else {
        document.querySelector('.cart__title').textContent = 'Корзина пустая';
    }
};

cartProductList.addEventListener('click', (evt) => {
    if (evt.target.closest('.cart__product')) {
        const productId = +evt.target.closest('.cart__product').dataset.id;
        const productInfo = JSON.parse(localStorage.getItem(productId));

        if (evt.target.matches('.counter-btn')) {
            updateCartProductCounter(productInfo, evt.target);
        } else if (evt.target.matches('.cart__product-cross')) {
            deleteCartProduct(productInfo, evt.target);
        }
    }
});

getDataArray(
    [
        'http://localhost:80/products?page=1',
        'http://localhost:80/products?page=2',
        'http://localhost:80/products?page=3',
    ],
    ([products1, products2, products3]) => {
        const products = products1.concat(products2, products3);
        getDataArray.products = products;
        renderCartProductList(products);
        updateOrderResult(products);
    }
);

updateHeaderCounter();

const radioWrapper = document.querySelector('.user-info__radio-wrapper');
const deliveryElements = document.querySelectorAll('.delivery');

radioWrapper.addEventListener('click', (evt) => {
    const labelElement = evt.target.closest('label');

    if (labelElement) {
        if (+labelElement.previousElementSibling.value) {
            deliveryElements.forEach(d => d.style.display = 'grid');
        } else {
            deliveryElements.forEach(d => d.style.display = 'none');
        }
    }
});

setOrderFormSubmit();
