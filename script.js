

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addCart(idItem) {
  fetch(`https://api.mercadolibre.com/items/${idItem.sku}`)
    .then(response => response.json())
    .then((data) => {
      const add = {
        sku: data.id,
        name: data.title,
        salePrice: data.price,
      };
      document.querySelector('.cart__items').appendChild(createCartItemElement(add));
    });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')).addEventListener('click', () => { addCart({ sku }); });
  return section;
}

window.onload = function onload() {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then(response => response.json())
    .then(data => data.results.forEach((produto) => {
      const product = createProductItemElement({
        sku: produto.id,
        name: produto.title,
        image: produto.thumbnail,
      });
      document.getElementsByClassName('items')[0].appendChild(product);
    }));
};

/* function getSkuFromProductItem(item) {
    return item.querySelector('span.item__sku').innerText;
  }*/
