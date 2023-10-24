
// Define Product
let productsDom = document.getElementById("arrivals");
let productsDom1 = document.getElementById("trending");
let productsDom2 = document.getElementById("top-rated");
let badegDom = document.getElementById("bad");
let products = productsDB;

function cart() {
  let dat = localStorage.getItem("productsInCart");
let dd; // تعريف dd في النطاق الخارجي للشرط

if (dat) {
  let cartDat = JSON.parse(dat);

  // التحقق من أن cartData هو مصفوفة
  let allQty = cartDat.map(product => product.qty);

  let totalQt = 0;

  for (let i = 0; i < allQty.length; i++) {
      totalQt += allQty[i];
  }

  dd = totalQt; 
  // console.log(allQty);

  badegDom.innerHTML = totalQt;

  
} else {
  console.log("لا توجد بيانات في localStorage.");
}
}
cart();



( function drawProductsUI  (products = []) {
  let arrivalsUI = [];
  let trendingUI = [];
  let topratedUI = [];

  products.forEach((item) => {
    let title = item.title;
      let modifiedString  = title.substring(0,23); 

    
    let productUI = `
    <div class="col-sm-6 col-md-4">
  
       <div class="product-box">
      <div class="img">
        <img src="${item.imageUrl}" alt="">
      </div>
      <div class="title">
      <a onclick='saveItemData(${item.id})' style=" cursor: pointer; "> 
      ${modifiedString} 
      </a>
      </div>
      <div class="rated">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="price">
        $${item.price}
      </div>
      <div class="des">
        <del>$${item.des}</del>
      </div>
      <button type="button" class="btn btn-dark" style="width: 100%;" onclick="addedToCart(${item.id})">Add to Cart</button>
    </div>
  
    </div>
    `;

    if (item.ca === "Arrivals") {
      arrivalsUI.push(productUI);
    } else if (item.ca === "Trending") {
      trendingUI.push(productUI);
    }else if (item.ca === "Toprated") {
      topratedUI.push(productUI);
    }
  });

  productsDom.innerHTML = arrivalsUI.join("");
  productsDom1.innerHTML = trendingUI.join("");
  productsDom2.innerHTML = topratedUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "product.html";
}

let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

function addedToCart(id) {
  let product = products.find((item) => item.id === id);

  if (product) {
    let existingProductIndex = addedItem.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      // إذا وجد المنتج في السلة، قم بزيادة الكمية فقط وقم بتحديث السعر بناءً على الكمية الجديدة
      addedItem[existingProductIndex].qty += 1;
      addedItem[existingProductIndex].price = addedItem[existingProductIndex].qty * product.price;
    } else {
      // إذا كان المنتج جديدًا، قم بإعداد الكمية والسعر وأضفه إلى السلة
      product.qty = 1;
      product.price = product.price;
      addedItem.push(product);
    }

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  } else {
    console.log("Product not found for the specified ID");
  }

  cart();
}





let pro = document.getElementById("best-sellers");

(function drawProductsUI(productsArray = []) {
let productUIArray = productsArray.map((item) => {
  return `
  <div class="best-seller-box" style=" display: flex; ">
  <div class="row" style=" width: 100%; ">


    <div class="col-4">
      <div class="img">
        <img src="${item.imageUrl}" alt="">
      </div>
    </div>

    <div class="col-8">
      <div class="best-seller-box-content">
        <a class="title" onclick='saveItemData(${item.id})'>${item.title}</a>
        <div class="rated">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="price">
          <div class="num-price">
            $${item.price}
          </div>
        </div>
        <del>$${item.des}</del>
      </div>
    </div>
    
  </div>
</div>
  `;
});

pro.innerHTML = productUIArray.join("");
})(products);























// let myString = "Redmi Y2(Gold, 4GB RAM, 64GB Storage)";
// let count = myString.length;



// if(myString.length >= 23){
// let modifiedString  = myString.substring(0,23); 
// console.log(modifiedString);
// }