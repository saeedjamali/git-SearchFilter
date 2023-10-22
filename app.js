//! http://localhost:3000/items
//* Declare Dom object

const inputSearch = document.querySelector("#search");
const btnFilter = document.querySelectorAll(".btnFilter");
const productsDOM = document.querySelector(".products");

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
    })
    .catch((err) => {
      console.log(err.message);
    });
});

inputSearch.addEventListener("input", (e) => {
  filterProduct.keySearch = e.target.value;
  currentProducts = findProduct(products, filterProduct);
  console.log(currentProducts);
  renderProduct(currentProducts);
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
