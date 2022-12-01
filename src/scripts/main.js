const shop = document.querySelector('.shop');
const circle = shop.querySelectorAll('.surfboard-box__circle');

shop.addEventListener('click', (evt) => {
  if (evt.target.closest('.surfboard-box__circle')) {
    evt.target.closest('.surfboard-box__circle').classList.toggle('circle--minus')
  }
})
