const headerBurgerButton = document.querySelector('.page-header__burger');
const headerNav = document.querySelector('.page-header__nav');
const headerLogo = document.querySelector('.page-header__logo');

headerBurgerButton.addEventListener('click', () => {
    headerBurgerButton.classList.toggle('active');
    headerNav.classList.toggle('active');
    headerLogo.classList.toggle('active');
});
