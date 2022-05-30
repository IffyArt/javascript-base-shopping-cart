const productItems = document.querySelectorAll('.product-items li');
const asideHeader = document.querySelector('.main__aside-header');
const cart = document.querySelector('.cart-items');
let cartItemsData = [];

productItems.forEach((element) => {
  const elementButton = element.querySelector('button');
  elementButton.addEventListener('click', () => {
    const itemName = element.querySelector('h2').innerHTML;
    const itemNumber = Number(element.querySelector('input').value);
    const cartItem = cartItemsData.find((item) => item.name === itemName);
    if (cartItem) {
      cartItem.number += itemNumber;
    } else {
      const newItem = {
        name: itemName,
        number: itemNumber,
        price: element.querySelector('b').innerHTML,
        imageSrc: element.querySelector('img').src,
      };
      cartItemsData.push(newItem);
    }

    renderCartItems();
  });
});

const renderCartItems = () => {
  let todoListUI;

  todoListUI = cartItemsData.map(
    (element) =>
      `<li>
			<header class="cart-items__cover">
				<img
					src="${element.imageSrc}"
				/>
			</header>
			<article class="cart-items__info">
				<h2>${element.name}</h2>
				<b>單價：${element.price}</b>
				<section class="cart-items__number">
					數量：${element.number}
				</section>
				<button class="cart-items__button">刪除項目</button>
			</article>
		</li>`,
  );
  cart.innerHTML = todoListUI.length
    ? todoListUI.join('')
    : '<li class="todo-list__not-found">目前沒有內容</li>';
  renderCartInfo();
  createNumberBoxAction();
  createItemDeleteAction();
};

const renderCartInfo = () => {
  const countNumber = cartItemsData.reduce(
    (prev, current) => prev + current.number,
    0,
  );
  const countPrice = cartItemsData.reduce(
    (prev, current) => prev + current.number * current.price,
    0,
  );
  asideHeader.innerHTML = `您總計選擇了 ${countNumber} 項商品，共計 NT.${countPrice}元 `;
};

const createNumberBoxAction = () => {
  const numberBox = document.querySelectorAll('.product-items__number');
  numberBox.forEach((element) => {
    let subtractBtn = element.querySelector('span');
    let addBtn = element.querySelector('span:nth-child(3)');
    let input = element.querySelector('input');

    subtractBtn.onclick = () => {
      input.value = Number(input.value) - 1;
      if (input.value <= 0) {
        input.value = 0;
      }
    };

    addBtn.onclick = () => {
      input.value = Number(input.value) + 1;
    };

    input.onkeyup = () => {
      if (Number(input.value) < 0) {
        input.value = 0;
      }
    };
  });
};

const createItemDeleteAction = () => {
  if (!cartItemsData.length) return;
  const cartItems = document.querySelectorAll('.cart-items li');

  cartItems.forEach((element, index) => {
    let deleteButton = element.querySelector('button');
    deleteButton.onclick = () => {
      cartItemsData.splice(index, 1);
      renderCartItems();
    };
  });
};

renderCartItems();
