///////////////////////////////////////////////////////////
// Mini-Menu Navigation

const miniMenu = document.querySelector(".mini-menu");
const miniMenuNav = document.querySelector(".mini-menu-items");
const miniProfile = document.querySelector(".mini-profile");
const caretUp = document.querySelector(".down-caret");
const caretDown = document.querySelector(".up-caret");

miniProfile.addEventListener("click", () => {
  miniMenu.classList.toggle("mini-menu--hider");
  miniMenuNav.classList.toggle("mini-menu-items--hidden");
  caretDown.classList.toggle("hide-caret");
  caretUp.classList.toggle("hide-caret");
});

// Tabs for navigation
const navs = document.querySelectorAll(".nav-link");
const navsContainer = document.querySelector(".nav-items");
const sections = document.querySelectorAll(".section");

// console.log(navs);

navsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav-link");
  // console.log(clicked);

  if (!clicked) return;
  //Active Nav
  navs.forEach((nav) => nav.classList.remove("nav-link--active"));
  sections.forEach((section) => section.classList.remove("display--section"));
  clicked.classList.add("nav-link--active");

  //Active content Area
  document
    .querySelector(`.content--${clicked.dataset.tab}`)
    .classList.add("display--section");
});

/////////////////////////////////
////Themes
//show select theme bar
const themeContainer = document.querySelector(".theme-container");
const colorPalette = document.querySelector(".color-palette");
const colors = document.querySelectorAll(".colors");
const themeBtn = document.querySelector(".theme");

themeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  colorPalette.classList.toggle("show-palette");
});

//Change theme funct

function initThemeSelector() {
  const themeStyleLink = document.getElementById("themeLink");
  const currentTheme = localStorage.getItem("theme") || "default";

  function activateTheme(themeName) {
    themeStyleLink.setAttribute("href", `./CSS/themes/${themeName}.css`);
  }

  colorPalette.addEventListener("click", function (e) {
    e.preventDefault();
    const clicked = e.target.closest(".colors");
    // console.log(clicked);
    if (!clicked) return;
    //activate theme
    activateTheme(clicked.id);
    localStorage.setItem("theme", clicked.id);
    clicked.id = currentTheme;
  });
  activateTheme(currentTheme);
}
initThemeSelector();

/////////////////////////////
//Product
const prodContainer = document.querySelector(".products-container");

const products = [
  {
    name: "Ribbena",
    image: './img/coconut oil.avif" alt="coconut',
    description: "joseph ebizimo loves magaret",
    price: "500",
  },
  {
    name: "Janety",
    image: "./img/hair dryer and coms.avif",
    description: "man like Godstime",
    price: "900",
  },
  {
    name: "Sweetheart",
    image: "./img/afro.jpg",
    description: "man like Okoro",
    price: "9100",
  },
  {
    name: "lol",
    image: "./img/afro.jpg",
    description: "man like Okoro",
    price: "970",
  },
  {
    name: "heart",
    image: "./img/afro.jpg",
    description: "man like Okoro",
    price: "900000",
  },
  {
    name: "Sweet",
    image: "./img/afro.jpg",
    description: "man like Okoro",
    price: "10",
  },
];

function addMarkUp(product) {
  product.forEach((value, i, _) => {
    const html = `
    <div class="products">
              <div class="product-img-container">
                <img class="image" src="${value.image}" />
              </div>
              <div class="product-details">
                <h4 class='title'>${value.name}</h4>
                <p>${value.description}.</p>
                <span class="price">Price: ${value.price}$</span>
                <div class="btn-container">
                  <button class="btn btn--cart ">
                    <span> Add to Cart</span>
                    <ion-icon name="cart"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
  `;

    prodContainer.insertAdjacentHTML("beforeend", html);
  });
}
addMarkUp(products);

//////////////////////////////////////
// Adding to cart
const cartBtn = document.querySelectorAll(".btn--cart");
const cartSection = document.querySelector(".table-body");
const counter = document.querySelector(".counter");

prodContainer.addEventListener("click", addToCartClicked);

function addToCartClicked(e) {
  products.forEach((value, i, _) => {
    const button = e.target.closest(".btn--cart");
    if (!button) return;
    const shopNow = button.parentElement.parentElement.parentElement;
    const title = shopNow.getElementsByClassName("title")[i].innerText;
    const image = shopNow.getElementsByClassName("image")[i].src;
    const price = shopNow.getElementsByClassName("price")[i].innerText;

    addItemToCart(title, price, image);
    // if (title === 1) return;

    const count = +counter.textContent + 1;
    counter.textContent = count;
    // counter.classList.add("occupied");
    // console.log(counter);

    updateTotal();
  });
}

function addItemToCart(title, price, image) {
  const cartRow = document.createElement("tr");
  const cartItems = document.getElementsByClassName("table-body")[0];
  cartRow.classList.add(".tab-row");
  const actPrice = price.slice(6, -1);

  const html = `<tr class="tab-row">
  <td>
  <div class="cart-product-details">
    <div class="cart-image-container">
      <img src="${image}" alt="" />
    </div>
    <div class="image-description">
      <ul>
        <li class="productTitle">${title}</li>
        
      </ul>
    </div>
  </div>
  </td>
   <td>
      <div class="quantity">
        <input class="qty-input" min="1" value="1" type="number" /> 
      </div>
    </td>
  
  <td>
     <span class="cartPrice">${actPrice}</span>
  </td>
  
  <td>
  <span class="total">${actPrice}</span>
  </td>
  
  <td class="tableBtn">
  <button class="order">Order Now</button>
  <button class="delBtn">Delete</button>
  </td>
  </tr>`;

  cartRow.innerHTML = html;
  cartItems.append(cartRow);
}

function updateTotal() {
  const qtyContainer = document.querySelectorAll(".quantity");
  let totals = document.querySelectorAll(".total");
  const cartPrice = document.querySelectorAll(".cartPrice");

  qtyContainer.forEach((container, i) => {
    container.addEventListener("change", (e) => {
      const qty = e.target.closest(".qty-input");
      cartPrice.forEach((pr, p) => {
        if (p === i) {
          const newTotal = +qty.value * +pr.textContent;

          totals.forEach((total, t) => {
            if (t === i && t === p) total.textContent = newTotal;
            // console.log(newTotal);
          });
        }
      });
    });
  });

  ////////////////////////////
  // Order and Delet
  const orderNow = document.getElementsByClassName("order");
  const delBtn = document.getElementsByClassName("delBtn");
  const tabRows = document.getElementsByClassName(".tab-row");
  const orderContainer = document.querySelector(".order-container");
  const orderClose = document.querySelector(".order-close-icon");

  let orderBtns = Array.from(orderNow);
  let rows = Array.from(tabRows);
  let delBtns = Array.from(delBtn);
  // console.log(orderBtns);
  // console.log(delBtns);
  // console.log(rows);

  orderBtns.forEach(
    (orderBtn, i) =>
      orderBtn.addEventListener("click", function () {
        rows.forEach((row, r) => {
          if (r === i) {
            console.log("jane", i);
            orderContainer.classList.add("hidden-form");

            const qtyOrdered = document.querySelector(".qtyOrdered");

            const qtyProd = Array.from(
              document.getElementsByClassName("qty-input")
            );

            const productOrdered = document.querySelector(".productOrdered");

            const productTitle = Array.from(
              document.getElementsByClassName("productTitle")
            );

            const orderTotal = document.querySelector(".orderTotal");

            const prodTotal = Array.from(
              document.getElementsByClassName("total")
            );

            // console.log(qtyOrdered, productOrdered, prodTotal, qty);

            ////
            qtyProd.forEach((qty, q) => {
              if (q === i) {
                qtyOrdered.value = qty.value;
              }
            });

            productTitle.forEach((prod, p) => {
              if (p === i) {
                productOrdered.value = prod.textContent;
              }
            });

            prodTotal.forEach((ord, o) => {
              if (o === i) {
                orderTotal.textContent = ord.textContent;
              }
            });
          }
        });
        orderClose.addEventListener("click", function () {
          console.log("closed");
          orderContainer.classList.remove("hidden-form");
          // ord.textContent = " ";
        });
      })

    // Product to order form transfer details
    //Close button
  );

  delBtns.forEach((delBtn, i, arr) =>
    rows.forEach((row, v) => {
      delBtn.addEventListener("click", function () {
        if (v === i) {
          // console.log("delBtn", i);
          row.remove();
          counter.textContent = arr.length - 1;
          counter.textContent = --arr.length;
        }
        console.log(arr.length - 1);
      });
    })
  );
}

// const c = +occupied.textContent - 1;
// occupied.textContent = c;
