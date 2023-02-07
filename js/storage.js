const counterElement = document.querySelector('.page-header__cart-counter');

const setStorageInfo = (buttonElement) => {
    const state1Element = buttonElement.querySelector('.state-1');
    const state2Element = buttonElement.querySelector('.state-2');

    const productInfo = {
        id: +buttonElement.closest('.product__item').dataset.id,
        count: 1
    }

    counterElement.textContent = Number(counterElement.textContent) + 1;
    localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
    state1Element.style.display = 'none';
    state2Element.style.display = 'flex';

    setTimeout(() => {
        buttonElement.classList.add('active');
    }, 0);
};

export {setStorageInfo};
