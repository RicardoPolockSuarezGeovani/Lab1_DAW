function onClick() {
    console.log("hiciste clic");
}
const button = document.querySelector('#boton');
button.addEventListener('click', onClick);

const element = document.querySelector('img');
element.src = 'gift-icon.png';