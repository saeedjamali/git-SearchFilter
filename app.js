//! http://localhost:3000/items
//* Declare Dom object

const inputSearch = document.querySelector("#search");
const btnFilter = document.querySelectorAll(".filterBtn");
const productsDOM = document.querySelector(".products");
const counterDOM = document.querySelector("#counter");
//*
let products = [],
  currentProducts = [],
  renderStr = "";
const filterProduct = {
  keySearch: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((result) => {
      products = result.data;
      currentProducts = products;
      renderProduct(currentProducts);
      counterDOM.innerHTML = currentProducts.length;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

inputSearch.addEventListener("input", (e) => {
  resetDom(e.target.value);
});

btnFilter.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (Number(e.target.dataset.classId)) {
      case 1:
        renderProduct(products);
        break;
      case 2:
        resetDom("watch");
        break;
      case 3:
        resetDom("shirt");
        break;
      case 4:
        resetDom("Jewellery");
        break;
      case 5:
        resetDom("gown");
        break;
    }
  });
});

const findProduct = (products, filterKey) => {
  return products.filter((p) =>
    p.title.toLowerCase().includes(filterKey.keySearch.toLowerCase())
  );
};

function renderProduct(_products) {
  renderStr = "";
  _products.forEach((_product) => {
    renderStr += getRenderProduct(_product);
  });
  productsDOM.innerHTML = renderStr;
  // counterDOM.innerHTML = _products.length;
}

function getRenderProduct(_product) {
  return `<div class="product">
    <div class="img-product">
      <img src=${_product.image} alt="" />
    </div>
    <div class="desc-product">
      <span class=price-product>${_product.price}</span>
      <span class=title-product>${_product.title}</span>
    </div>
  </div>`;
}

function resetDom(str) {
  filterProduct.keySearch = str;
  currentProducts = findProduct(products, filterProduct);
  renderProduct(currentProducts);
  counterDOM.innerHTML = currentProducts.length;
}
