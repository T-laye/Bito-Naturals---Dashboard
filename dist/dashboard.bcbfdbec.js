const miniMenu = document.querySelector(".mini-menu"),
  miniMenuNav = document.querySelector(".mini-menu-items"),
  miniProfile = document.querySelector(".mini-profile"),
  caretUp = document.querySelector(".down-caret"),
  caretDown = document.querySelector(".up-caret");
miniProfile.addEventListener("click", () => {
  miniMenu.classList.toggle("mini-menu--hider"),
    miniMenuNav.classList.toggle("mini-menu-items--hidden"),
    caretDown.classList.toggle("hide-caret"),
    caretUp.classList.toggle("hide-caret");
});
const navs = document.querySelectorAll(".nav-link"),
  navsContainer = document.querySelector(".nav-items"),
  sections = document.querySelectorAll(".section");
navsContainer.addEventListener("click", function (e) {
  const t = e.target.closest(".nav-link");
  t &&
    (navs.forEach((e) => e.classList.remove("nav-link--active")),
    sections.forEach((e) => e.classList.remove("display--section")),
    t.classList.add("nav-link--active"),
    document
      .querySelector(`.content--${t.dataset.tab}`)
      .classList.add("display--section"));
});
const themeContainer = document.querySelector(".theme-container"),
  colorPalette = document.querySelector(".color-palette"),
  colors = document.querySelectorAll(".colors"),
  themeBtn = document.querySelector(".theme");
function initThemeSelector() {
  const e = document.getElementById("themeLink"),
    t = localStorage.getItem("theme") || "default";
  function n(t) {
    e.setAttribute("href", `./themes/${t}.css`);
  }
  colorPalette.addEventListener("click", function (e) {
    e.preventDefault();
    const o = e.target.closest(".colors");
    o && (n(o.id), localStorage.setItem("theme", o.id), (o.id = t));
  }),
    n(t);
}
themeBtn.addEventListener("click", (e) => {
  e.preventDefault(), colorPalette.classList.toggle("show-palette");
}),
  initThemeSelector();
const prodContainer = document.querySelector(".products-container"),
  products = [
    {
      name: "Coconut Oil",
      image:
        'https://images.everydayhealth.com/images/creative-ways-to-use-coconut-oil-1440x810.jpg?sfvrsn=ad85993_1" alt="coconut',
      description: "Cold press coconut oil",
      price: "1000",
    },
    {
      name: "Neem Oil",
      image: "./img/neem-oil.avif",
      description: "Freshly made neem oil",
      price: "500",
    },
    {
      name: "Beard Oil",
      image: "https://m.media-amazon.com/images/I/61xtM1H60nL._SL1500_.jpg",
      description: "Oil to improve beard growth",
      price: "2500",
    },
    {
      name: "Anti-dandruff Shampoo",
      image:
        "https://post.healthline.com/wp-content/uploads/2020/07/533274-The-Best-Micellar-Shampoos-for-Clean-Shiny-Hair-732x549-Feature-732x549.jpg",
      description: "Keep your hair dandruff free with our shampoo",
      price: "2000",
    },
    {
      name: "Deep conditioner",
      image:
        "https://cdn.shopify.com/s/files/1/0660/1153/products/main02_grande.png?v=1478069565",
      description: "Healthy hair conditioner",
      price: "1500",
    },
    {
      name: "Lice treatment",
      image:
        "https://www.suave.com/sk-eu/content/dam/brands/suave/united_states_ofamerica/60448107-58552949.png.rendition.767.767.png",
      description: "Effective remedy against lice",
      price: "1000",
    },
    {
      name: "Hair bonnet",
      image: "https://africanthings.org/wp-content/uploads/2021/11/160.jpg",
      description: "Silk hair bonnets for hair protection",
      price: "500",
    },
    {
      name: "Comb set",
      image:
        "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/V/N/153414_1650541308.jpg",
      description: "Effective break-no-more combs",
      price: "1500",
    },
    {
      name: "Protein Treatment",
      image:
        "https://www.mirrorsbeautylounge.com/mirror-admin/public/images/sub-service-gallery/Layer%2014.jpg",
      description: "Healthy hair growth remedy",
      price: "2000",
    },
    {
      name: "Hair growth Kit",
      image:
        "https://kdbdeals.com/wp-content/uploads/2022/02/Bombay-Shaving-Company-Hair-Growth-Kit-with-Dermaroller.jpg",
      description: "Complete hair growth set",
      price: "10000",
    },
    {
      name: "Hair cream",
      image:
        "https://static1.michael84.co.uk/wp-content/uploads/mens-hair-style-tips-advice-1080x670.jpg",
      description: "Healthy haircream mixture",
      price: "500",
    },
    {
      name: "Natural hair relaxer",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1595269934-mizani-1595269916.jpg?crop=1xw:1xh;center,top&resize=480:*",
      description: "Mild relaxer for natural hair",
      price: "5000",
    },
  ];
function addMarkUp(e) {
  e.forEach((e, t, n) => {
    const o = `\n    <div class="products">\n              <div class="product-img-container">\n                <img class="image" src="${e.image}" />\n              </div>\n              <div class="product-details">\n                <h4 class='title'>${e.name}</h4>\n                <p>${e.description}.</p>\n                <span class="price">Price(???): ${e.price}</span>\n                <div class="btn-container">\n                  <button class="btn btn--cart ">\n                    <span> Add to Cart</span>\n                    <ion-icon name="cart"></ion-icon>\n                  </button>\n                </div>\n              </div>\n            </div>\n  `;
    prodContainer.insertAdjacentHTML("beforeend", o);
  });
}
addMarkUp(products);
const cartBtn = document.querySelectorAll(".btn--cart"),
  cartSection = document.querySelector(".table-body"),
  counter = document.querySelector(".counter");
function addToCartClicked(e) {
  products.forEach((t, n, o) => {
    const a = e.target.closest(".btn--cart");
    if (!a) return;
    const r = a.parentElement.parentElement.parentElement,
      c = r.getElementsByClassName("title")[n].innerText,
      i = r.getElementsByClassName("image")[n].src;
    addItemToCart(c, r.getElementsByClassName("price")[n].innerText, i);
    const s = +counter.textContent + 1;
    (counter.textContent = s), updateTotal();
  });
}
function addItemToCart(e, t, n) {
  const o = document.createElement("li"),
    a = document.getElementsByClassName("list")[0];
  o.classList.add(".tab-row");
  const r = t.slice(9, -1),
    c = `\n   <li class="list__item">\n    <div  class="cart-product-details">\n        <div class="cart-image-container">\n          <img src="${n}" alt="" />\n        </div>\n        <div class="image-description">\n          <h3 class="productTitle">${e}</h3>\n        </div>\n    </div>\n    <div class="quantity">\n      Qty :\n        <input class="qty-input" min="1" value="1" type="number" /> \n      </div>\n      <div>\n        Price :\n        <span class="cartPrice">${r} </span>\n      </div>\n      <div>\n        Total:\n        <span class="total">${r}</span>\n      </div>\n\n      <div class="cartBtn tableBtn">\n        <button class="btn order">Order Now</button>\n        \n        <button class="btn delBtn">????</button>\n      </div>\n  </li>\n  `;
  (o.innerHTML = c), a.append(o);
}
function updateTotal() {
  const e = document.querySelectorAll(".quantity");
  let t = document.querySelectorAll(".total");
  const n = document.querySelectorAll(".cartPrice");
  e.forEach((e, o) => {
    e.addEventListener("change", (e) => {
      const a = e.target.closest(".qty-input");
      n.forEach((e, n) => {
        if (n === o) {
          const r = +a.value * +e.textContent;
          t.forEach((e, t) => {
            t === o && t === n && (e.textContent = r);
          });
        }
      });
    });
  });
  const o = document.getElementsByClassName("order"),
    a = document.getElementsByClassName("delBtn"),
    r = document.getElementsByClassName(".tab-row"),
    c = document.querySelector(".order-container"),
    i = document.querySelector(".order-close-icon");
  let s = Array.from(o),
    l = Array.from(r),
    d = Array.from(a);
  s.forEach((e, t) =>
    e.addEventListener("click", function () {
      l.forEach((e, n) => {
        if (n === t) {
          console.log("jane", t), c.classList.add("hidden-form");
          const e = document.querySelector(".qtyOrdered"),
            n = Array.from(document.getElementsByClassName("qty-input")),
            o = document.querySelector(".productOrdered"),
            a = Array.from(document.getElementsByClassName("productTitle")),
            r = document.querySelector(".orderTotal"),
            i = Array.from(document.getElementsByClassName("total"));
          n.forEach((n, o) => {
            o === t && (e.value = n.value);
          }),
            a.forEach((e, n) => {
              n === t && (o.value = e.textContent);
            }),
            i.forEach((e, n) => {
              n === t && (r.value = e.textContent);
            });
        }
      }),
        i.addEventListener("click", function () {
          console.log("closed"), c.classList.remove("hidden-form");
        });
    })
  ),
    d.forEach((e, t, n) =>
      l.forEach((o, a) => {
        e.addEventListener("click", function () {
          a === t &&
            (o.remove(),
            (counter.textContent = n.length - 1),
            (counter.textContent = --n.length)),
            console.log(n.length - 1);
        });
      })
    );
}
prodContainer.addEventListener("click", addToCartClicked);
//# sourceMappingURL=dashboard.bcbfdbec.js.map
