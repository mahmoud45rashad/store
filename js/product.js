
let productId = localStorage.getItem("productId");

let itemDom = document.getElementById("item-details");
let moreFromPavone = document.getElementById("product-row"); 
let moreFromPavone2 = document.getElementById("product-row2"); 
let moreFromPavone3 = document.getElementById("product-row3"); 
let badgeDom = document.querySelector(".bade");

function cart() {
    let data = localStorage.getItem("productsInCart");
    
    if (data) {
      try {
        let cartData = JSON.parse(data);
        
        if (Array.isArray(cartData)) { // التحقق من أن cartData هو مصفوفة
          let allQtys = cartData.map(product => product.qty);
          let totalQty = 0;
    
          for (let i = 0; i < allQtys.length; i++) {
            totalQty += allQtys[i];
          }
    
           
          badgeDom.innerHTML = totalQty;
        } else {
          console.error("البيانات في localStorage ليست مصفوفة.");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء تحويل البيانات إلى كائن:", error);
      }
    } else {
      console.log("لا توجد بيانات في localStorage.");
    }
    
    }
    
    cart();


let productDetails =  productsDB.find((item) => item.id == productId);

itemDom.innerHTML = `
<div class="col-6 images-section-col">
<div class="images-section">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
            <a href="">  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"> <img src="${productDetails.imageUrl}" class="d-block " alt="..."></button></a>
            <a href="">  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"> <img src="${productDetails.imageUrl2}" class="d-block " alt="..."></button></a>
            <a href="">  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"> <img src="${productDetails.imageUrl3}" class="d-block " alt="..."></button></a>
            <a href="">  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"> <img src="${productDetails.imageUrl4}" class="d-block " alt="..."></button></a>
            <a href="">  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"> <img src="${productDetails.imageUrl5}" class="d-block " alt="..."></button></a>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${productDetails.imageUrl}"  alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productDetails.imageUrl2}"  alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productDetails.imageUrl3}"  alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productDetails.imageUrl4}"  alt="...">
          </div>
          <div class="carousel-item">
            <img src="${productDetails.imageUrl5}"  alt="...">
          </div>
        </div>
      </div>
</div>
</div>
<div class="col-6 product-detail-col">
<div class="product-detail">
    <div class="product-name">
        <h4 style=" font-weight: normal; ">${productDetails.title} </h4>
    </div>             
    <div class="category">
        <h5 style=" font-weight: normal; ">Category : ${productDetails.category}</h5>
    </div> 
    <div class="price">
      <h5 style=" font-weight: normal; ">Price : $${productDetails.price}</h5>
    </div>
    <h5 class="quantityh5-out">Quantity</h5>
    <div class="addtocart">


    <div class="addtocart1">

    <div class="num">
    <h5 class="quantityh5">Quantity</h5>
    <input type="number" class="cart-number form-control" onclick="cartNumber()" id="cart-number"  value="1" min="1" max="10">
    </div>

    <button class="btn btn-primary" onclick="addedToCart(${productDetails.id})">Add To Cart</button>
    <div class="wishlist">
        <input type="checkbox"><i class="fa-solid fa-heart"></i></input>
    </div>

    </div>


    </div>
</div>
</div>
`;


// function cartNumber() {
//   let cartNumber = document.getElementById("cart-number");
// console.log(cartNumber.value);
// }
// cartNumber();
let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

let cartNumber = document.getElementById("cart-number");

function addedToCart(id) {
  let product = productsDB.find((item) => item.id === id);
  let cartQuantity = parseInt(cartNumber.value, 10); // تحويل القيمة إلى عدد صحيح

  if (product && !isNaN(cartQuantity) && cartQuantity > 0) {
    let existingProductIndex = addedItem.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      // إذا وجد المنتج في السلة، قم بزيادة الكمية بناءً على القيمة المحولة من cartNumber
      addedItem[existingProductIndex].qty += cartQuantity;
      addedItem[existingProductIndex].price = addedItem[existingProductIndex].qty * product.price;
    } else {
      // إذا كان المنتج جديدًا، قم بإعداد الكمية والسعر وأضفه إلى السلة
      product.qty = cartQuantity; // استخدام القيمة المحولة من cartNumber
      product.price = product.price * cartQuantity; // حساب السعر بناءً على الكمية
      addedItem.push(product);
    }

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  } else {
    console.log("Product not found for the specified ID or invalid quantity.");
  }

  cart();
}






let drawProductsUI;
(drawProductsUI = function (productsDB = []) {
  let productsToDisplay = productsDB.slice(0, 4);
  let productsUI = productsToDisplay.map((item) => {
    return `
    <div class="col-md-3 ">
    <div class="product">
      <div class="product-img">
        <img src="${item.imageUrl}" alt="">
      </div>
      <div style="margin-left: 9px;">
      <div class="product-title">
      <a onclick='saveItemData(${item.id})'>${item.title}</a>
      </div>
        <div class="rating">
          <span>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </span>

        </div>
        <div class="product-price"><span>$</span><h6>${item.price}</h6></div>
        <div class="product-off"><del>${item.des} </del><span>29% OFF</span></div>
      </div>
    </div>
  </div>
    `;
  });

  moreFromPavone.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || productsDB);



let drawProductsUI2;
(drawProductsUI2 = function (productsDB = []) {
  let productsToDisplay = productsDB.slice(6, 10);
  let productsUI = productsToDisplay.map((item) => {
    return `
    <div class="col-md-3">
    <div class="product">
      <div class="product-img">
        <img src="${item.imageUrl}" alt="">
      </div>
      <div style="margin-left: 9px;">
      <div class="product-title">
      <a onclick='saveItemData(${item.id})'>${item.title}</a>
      </div>
        <div class="rating">
          <span>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </span>

        </div>
        <div class="product-price"><span>$</span><h6>${item.price}</h6></div>
        <div class="product-off"><del>${item.des} </del><span>29% OFF</span></div>
      </div>
    </div>
  </div>
    `;
  });

  moreFromPavone2.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || productsDB);




let drawProductsUI3;
(drawProductsUI3 = function (productsDB = []) {
  let productsToDisplay = productsDB.slice(12, 16);
  let productsUI = productsToDisplay.map((item) => {
    return `
    <div class="col-md-3 ">
    <div class="product">
      <div class="product-img">
        <img src="${item.imageUrl}" alt="">
      </div>
      <div style="margin-left: 9px;">
      <div class="product-title">
      <a onclick='saveItemData(${item.id})'>${item.title}</a>
      </div>
        <div class="rating">
          <span>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </span>

        </div>
        <div class="product-price"><span>$</span><h6>${item.price}</h6></div>
        <div class="product-off"><del>${item.des} </del><span>29% OFF</span></div>
      </div>
    </div>
  </div>
    `;
  });

  moreFromPavone3.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || productsDB);



function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "product.html";
}
 