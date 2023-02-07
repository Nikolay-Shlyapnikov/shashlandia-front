// const data =     
// { 
//     totalPrice: 40000,
//     products: [
//         {
//             name: 'Шашлык',
//             count: '10',
//             weight: '100kg',
//             img_path: '123.png',
//             price: 2000,
//         },
//         {
//             name: 'Шашлык',
//             count: 10,
//             weight: '100kg',
//             img_path: '123.png',
//             price: 2000,
//         },
//     ]
// }

const orderModalElement = document.querySelector('.window__wrapper');
const productsListElement = orderModalElement.querySelector('.cart__product-wrapper');
const productTemplate = document.getElementById('product')
    .content
    .querySelector('.cart__product');

const renderOrderProducts = (products) => {
    productsListElement.innerHTML = '';
    openOrderModal.total = 0;

    products.forEach((orderProduct) => {
        const product = orderProduct.product;
        const productElement = productTemplate.cloneNode(true);
        
        productElement.querySelector('.product__counter').textContent = orderProduct.count;
        productElement.querySelector('.cart__product-name').innerHTML = product.title;
        productElement.querySelector('.cart__product-weight').textContent = product.weight;
        productElement.querySelector('.cart__product-price').innerHTML = `${product.price} &#8381;`;
        productElement.querySelector('.cart__product-image > img').src = `/uploads/products/${product.image_src}`;
        
        productsListElement.append(productElement);
        openOrderModal.total += +orderProduct.count;
    });
}

 const openOrderModal = ({products}, totalPrice) => {
    if (openOrderModal.total === undefined) {
        openOrderModal.total = 0;
    }

    renderOrderProducts(products);
    orderModalElement.querySelector(".price-wt").textContent = totalPrice;
    orderModalElement.querySelector(".total-wt").textContent = openOrderModal.total;
    
    document.querySelector('.cart__product-cross').addEventListener('click', closeOrderModal);
    document.querySelector('.window__wrapper').addEventListener('click', onOverlayClick);
    orderModalElement.style.display = 'flex';   
}


const onOverlayClick = (evt) => {
    if (evt.target.matches('.window__wrapper')) {
        closeOrderModal();
    }
}

const closeOrderModal = () => orderModalElement.style.display = 'none';

export {openOrderModal};