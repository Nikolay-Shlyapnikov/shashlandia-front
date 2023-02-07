import {sendData} from "./api.js";
import {updateHeaderCounter} from "./counter.js";

const orderForm = document.getElementById('order-form');
const submitButton = orderForm.querySelector('button[type=submit]');
const orderResult = document.querySelector('.price-wt');
const sections = document.querySelectorAll('section:not(.cart__order-result)');

const ORDER_KEYS = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'street',
    'entrance',
    'storey',
    'flat',
];

const orderInputs = ORDER_KEYS.map((key) => document.querySelector(`[name=${key}]`));

const renderValidationErrors = (errors) => {
    console.log(errors);
    Object.entries(errors).forEach(error => {
        if (ORDER_KEYS.includes(error[0])) {
            const inputElement = document.querySelector(`[name=${error[0]}]`);
            inputElement.classList.add('input-error');
            inputElement.nextElementSibling.textContent = error[1][0];
        }
    });
};

const clearValidationErrors = () => {
    orderInputs.forEach(input => {
        input.classList.remove('input-error');
        input.nextElementSibling.textContent = '';
    });
};

const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Заказываю...';
    submitButton.style.cursor = 'not-allowed';
};

const unblockSubmitButton = (errors = null, id = null) => {
    submitButton.disabled = false;
    submitButton.textContent = 'Заказать';
    submitButton.style.cursor = 'initial';
    clearValidationErrors();

    if (errors) {
        renderValidationErrors(errors);
    } else {
        window.localStorage.clear();
        updateHeaderCounter();
        orderInputs.forEach((input) => input.value = '');
        Array.from(sections).forEach(section => section.style.display = 'none');
        document.querySelector('.cart__title').textContent = `Заказ №${id} успешно создан!`;
        window.scrollTo(0, 0);        
    }
};

const setOrderFormSubmit = () => {
    orderForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const products = [];
        const keys = Object.keys(localStorage);
        for(const key of keys) {
            products.push(JSON.parse(localStorage.getItem(key)));
        }

        const formData = new FormData(evt.target);
        formData.set('total_price', +orderResult.textContent);
        formData.set('products', JSON.stringify(products));

        blockSubmitButton();
        setTimeout(() => {
            sendData(
                'http://localhost:80/orders',
                ({id}) => {
                    unblockSubmitButton(null, id);
                },
                (errors) => {
                    unblockSubmitButton(errors);
                },
                formData
            );
        }, 2000);
    });
};

export {setOrderFormSubmit};
