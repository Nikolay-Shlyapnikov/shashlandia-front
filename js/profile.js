import {getDataArray} from './api.js';
import {openOrderModal} from './order-modal.js';
import {updateHeaderCounter} from './counter.js';

const orderListElement = document.querySelector('.order__wrapper');

orderListElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.order__info')) {
        console.log(evt.target);
        const orderElement = evt.target.closest('.order__item');
        if (orderElement) {
            const totalPrice = orderElement.querySelector('.order__price').textContent;
            const id = orderElement.dataset.orderId;
            getDataArray(
                [`http://localhost:80/orders/${id}`],
                ([order]) => {
                    openOrderModal(order, totalPrice);
                }
            );
        }
    }
});

updateHeaderCounter();
