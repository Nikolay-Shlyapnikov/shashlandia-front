import {getDataArray} from "./api.js";

const cartProductList = document.querySelector('.cart__product-wrapper');
const headerCounterElement = document.querySelector('.page-header__cart-counter');
const servicesButton = document.querySelector('.services__button');
const orderResult = document.querySelector('.cart__order-result');
const sections = document.querySelectorAll('section:not(.cart__order-result)');
const BARBECUE_MAN_ID = 51;

const updateOrderResult = (products) => {
    let totalCount = 0;
    let totalPrice = 0;

    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    for (const key of keys) {
        const item = JSON.parse(localStorage.getItem(key));
        totalCount += item.count;
        totalPrice += products.find((product) => product.id === item.id).price * item.count;
    }

    orderResult.querySelector('.total-wt').textContent = totalCount;
    orderResult.querySelector('.price-wt').textContent = totalPrice;
};

const restoreProductCounter = (productInfo, target) => {
    const buttonElement = target.closest('.product__button');

    if (buttonElement) {
        localStorage.removeItem(productInfo.id);

        const state1Element = buttonElement.querySelector('.state-1');
        const state2Element = buttonElement.querySelector('.state-2');
        state1Element.style.display = 'flex';
        state2Element.style.display = 'none';
        buttonElement.classList.remove('active');
    }
};

const updateProductCounter = (productInfo, target, cartMode = false) => {
    if (target.matches('.product__plus')) {
        productInfo.count++;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) + 1;
    } else if (target.matches('.product__minus')) {
        productInfo.count--;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) - 1;
    }

    if (productInfo.count === 0) {
        if (cartMode) {
            // target.closest('.cart__product').style.transitionDuration = '300ms';
            // target.closest('.cart__product').style.opacity = 0;

            // setTimeout(() => {
            //     target.closest('.cart__product').remove();
            //     localStorage.removeItem(productInfo.id);

            //     if (cartProductList.children.length === 0) {
            //         document.querySelector('.left-side').style.display = 'none';
            //         document.querySelector('.right-side').style.display = 'none';
            //         document.querySelector('.cart__title').textContent = 'Корзина пустая';
            //     }
            // }, 1000);
        } else {
            restoreProductCounter(productInfo, target);
        }
        return;

    } else {
        const productCount = target.parentElement.querySelector('.product__counter');
        productCount.innerHTML = productInfo.count;
    }

    localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
};

const updateCartProductCounter = (productInfo, target) => {
    if (target.matches('.product__plus')) {
        // console.log(1);
        productInfo.count++;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) + 1;
    } else if (target.matches('.product__minus')) {
        productInfo.count--;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) - 1;
    }

    if (productInfo.count === 0) {
        deleteCartProduct(productInfo, target);
        return;
    }

    const productCount = target.parentElement.querySelector('.product__counter');
    productCount.innerHTML = productInfo.count;
    localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
    updateOrderResult(getDataArray.products);
};

const deleteCartProduct = (productInfo, target) => {
    target.closest('.cart__product').style.opacity = 0;
    
    const count = +headerCounterElement.textContent;
    headerCounterElement.textContent = count - productInfo.count;
    localStorage.removeItem(productInfo.id);
    updateOrderResult(getDataArray.products);
    
    setTimeout(() => {
        target.closest('.cart__product').remove();

        if (cartProductList.children.length === 0) {
            Array.from(sections).forEach(section => section.style.display = 'none');
            document.querySelector('.cart__title').textContent = 'Корзина пустая';
            window.scrollTo(0, 0);
        }
    }, 1000);
};

const updateHeaderCounter = () => {
    let total = 0;
    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    for(const key of keys.filter((key) => +key !== BARBECUE_MAN_ID)) {
        total += JSON.parse(localStorage.getItem(key)).count;
    }

    if (localStorage.getItem(BARBECUE_MAN_ID)) {
        if (servicesButton) {
            servicesButton.classList.add('active');
            servicesButton.textContent = 'Нанят';
        }

        total += 1;
    }

    headerCounterElement.textContent = String(total);
};

const updateBarbecueCounter = (buttonElement) => {
    if (!localStorage.getItem(String(BARBECUE_MAN_ID))) {
        buttonElement.classList.remove('active');
        buttonElement.textContent = 'Нанять';
        headerCounterElement.textContent = Number(headerCounterElement.textContent) - 1;
    } else {
        buttonElement.classList.add('active');
        buttonElement.textContent = 'Нанят';
        headerCounterElement.textContent = Number(headerCounterElement.textContent) + 1;
    }
};

const toggleBarbecueCounter = (buttonElement) => {
    if (localStorage.getItem(BARBECUE_MAN_ID)) {
        localStorage.removeItem(BARBECUE_MAN_ID);
    } else {
        const json = JSON.stringify({id: BARBECUE_MAN_ID, count: 1});
        localStorage.setItem(BARBECUE_MAN_ID, json);
    }

    updateBarbecueCounter(buttonElement);
};

export {
    deleteCartProduct,
    updateHeaderCounter,
    updateProductCounter,
    updateCartProductCounter,
    updateOrderResult,
    toggleBarbecueCounter,
};
