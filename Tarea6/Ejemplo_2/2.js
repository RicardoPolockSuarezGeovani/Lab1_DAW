const element = document.querySelector('img');
element.src = '../iconos/gift-icon.png';

function abrirRegalo() {
    const image = document.querySelector('img');
    image.src = '../iconos/giphy.gif';
    image.removeEventListener('click', abrirRegalo);
}

const image = document.querySelector('img');
image.addEventListener('click', abrirRegalo);