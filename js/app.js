const loadProducts = () => {
  const url = `https://fakestoreapi.com/products?limit=9`;
  // const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="card border rounded-3 border-secondary single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>

        <div class="card-body">
          <h5>${product.title}</h5>
        </div>
      
        <div class="card-footer border-top-0 bg-white">
          <p class="text-muted">Category: ${product.category}</p>
          <small class="text-muted pe-3">Reviews: ${product.rating.count}</small>
          <small class="text-muted">Rating: ${product.rating.rate}</small>
          <h5>Price: $${product.price}</h5>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success mt-3">add to cart</button>
          <button onclick="getProductDetails(${product.id})" id="details-btn" class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const getProductDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showProductDetails(data))
}

const showProductDetails = (product) => {
  const title = product.title;
  const category = product.category;
  const description = product.description;
  const price = product.price;
  const totalReview = product.rating.count;
  const rating = product.rating.rate;

  const element = document.getElementById('product-details');
  element.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card-body');
  div.innerHTML = `
  <h5 class="card-title">${title}</h5>
  <p class="card-text">Category: ${category}</p>
  <p class="card-text">Price: $${price}</p>
  <p class="card-text">Reviews: ${totalReview}</p>
  <p class="card-text">Rating: ${rating}</p>
  <p class="card-text">${description}</p>
  `;
  element.appendChild(div);
}
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
