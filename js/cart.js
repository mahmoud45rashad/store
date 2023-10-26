let productdata = JSON.parse(localStorage.getItem("productsInCart"));

if (productdata == "") {
    console.log("yes");

    window.addEventListener("load", () => {
        // تحديد عنوان URL للصفحة الأخرى
        const newPageURL = "index.html";
        // تحويل إلى الصفحة الجديدة
        window.location.href = newPageURL;
    });
}else{
    let productscarts = document.getElementById("shop-cart");
    let badgeDom = document.getElementById("bade");
    let items = document.getElementById("itms");
    let itemsc = document.getElementById("items");
    // let totalPricecart = document.getElementById("total-pric");
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
    
        badgeDom.innerHTML = totalQt;
        items.innerHTML = totalQt;
        itemsc.innerHTML = totalQt;
        
    } else {
        console.log("لا توجد بيانات في localStorage.");
    }
    }
    cart();
    
    
    
    
    
    
    function drawCartProductsUI(allProducts = []) {
        let productsLOC = JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
        let displayedProducts = new Set(); // مصفوفة لتتبع المنتجات التي تم عرضها
    
        let productsU = productsLOC.map((item) => {
            // التحقق مما إذا تم عرض المنتج بالفعل
            if (!displayedProducts.has(item.id)) {
                displayedProducts.add(item.id); // إضافة مفتاح الـ id للمنتج إلى مصفوفة المنتجات المعروضة
                let priceItem = products.find((product) => product.id === item.id);
                return `
                <div class="shop-cart-box row">

                <div  class="col-sm-4 col-12">
                  <div class="cart-box-bannr">
                  <img src="${item.imageUrl}" alt="">
                  </div>
                </div>

                <div class="col-sm-8 col-12">
                <div class="cart-box-container">
                 
          
                  
                  <div class="cart-box-title">
                      ${item.title}   
                  </div>
                  
          
              
                  <div class="cart-box-price">
                      $${priceItem.price}
                      <del>$${item.des}</del>
                  </div>
                  
          
          
              
          
                    <div class="cart-box-text">
                        <P class="instock">In Stock</P>
                        <p class="Shipping">Eligible for Free Shipping</p>
                        <p class="sold">Sold by: <a href="">l-DEAL_egy</a></p>
                    </div>
                    <h5 style=" margin-bottom: -9px; margin-left: 3px; ">Quantity</h5>
                    <div class="cart-box-action">
                   
                    <div class="total">
                    <button class="minus" id="minus" onclick="minusToItem(${item.id})"><i class="fa-solid fa-minus"></i></button>
            
                    <div class="number" id="number">${item.qty} </div>
            
            
                    <button class="plus" id="plus" onclick="addedToplus(${item.id})"><i class="fa-solid fa-plus"></i></button>
                </div>          
                        <div  class="delete">  <a href=""  onclick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash"></i></a></div>

                    </div>
          
                </div>
                </div>
            </div>
                `;
            }
        });
      
    
        productscarts.innerHTML = productsU.join("");
    
    }
    
      drawCartProductsUI();
    
    
      function removeItemFromCart(id) {
        let productsInCart = localStorage.getItem("productsInCart");
        if (productsInCart) {
          let items = JSON.parse(productsInCart);
          let filteredItems = items.filter((item) => item.id !== id);
          localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
          drawCartProductsUI(filteredItems);
    
        }
      }
      
    
    
    
      let totalPricecart = document.getElementById("totalc"); 
      let totalPricecart2 = document.getElementById("total-pric"); 
      function totalprice() {
          let price = localStorage.getItem("productsInCart");
          let price1;
  
          if (price) {
              let cartprice = JSON.parse(price);
              let allprice = cartprice.map(product => parseFloat(product.price));
  
              let totaprice = 0;
  
              for (let i = 0; i < allprice.length; i++) {
                  totaprice += allprice[i];
              }
  
              price1 = totaprice; 
              console.log(totaprice);
              totalPricecart.innerHTML = "$" + totaprice;
              totalPricecart2.innerHTML = "$" + totaprice;
          }
      }
  
    
    totalprice();
    
    let minus = document.getElementById("minus");
    let plus  = document.getElementById("plus");
    
    
    
    let plusItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];
    
    function addedToplus(id){
        let product = products.find((item) => item.id === id);
       
            

            if (product) {
                let existingProduct = plusItem.find((p) => p.id === product.id);
            
                if (existingProduct) {
                    existingProduct.qty += 1;
                    existingProduct.price = existingProduct.qty * product.price;;
                  } else {
                    product.qty = 1; // Initialize quantity if it's a new product
                    product.price = product.price;
                    plusItem.push(product);
                  }
              
                localStorage.setItem("productsInCart", JSON.stringify(plusItem));
                drawCartProductsUI(product);
                cart();
                totalprice()
            }
      
        
    }
    
    let minusItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

    function minusToItem(id) {
        let existingProductIndex = minusItem.findIndex((p) => p.id === id);
    
        if (existingProductIndex !== -1) {
            let existingProduct = minusItem[existingProductIndex];
    
            if (existingProduct.qty > 1) {
                existingProduct.qty -= 1;
                existingProduct.price -= existingProduct.price; // تحديث السعر بإجراء النقص
            } else {
                // إذا كانت الكمية تساوي 1، قم بإزالة المنتج من السلة
                minusItem.splice(existingProductIndex, 1);
            }
    
            localStorage.setItem("productsInCart", JSON.stringify(minusItem));
            drawCartProductsUI(existingProductIndex);
            cart();
            totalprice();
        }
    }
    
    
     
}

















let productsD = [
    {
      id: 1,
      title: "Redmi Y2(Gold, 4GB RAM, 64GB Storage)",
      price: "1",
      imageUrl: "img/jewellery-2.jpg",
      des: "100000",
      qty: 1,
      ca: "Arrivals"
    },
    {
      id: 2,
      title: "Redmi Y2(Gold, 4GB RAM, 64GB Storage)",
      price: 40,
      imageUrl: "img/jewellery-1.jpg",
      des: "100000",
      qty: 1,
      ca: "Trending"
    },
    {
      id: 3,
      title: "headphone1item",
      price: "200",
      imageUrl: "img/jewellery-1.jpg",
      des: "100000",
      qty: 1,
      ca: "Toprated"
    }
];

let pro = document.getElementById("best-sellers");

(function drawProductsUI(productsArray = []) {
  let productsToDisplay = productsArray.slice(0,5);
  let productUIArray = productsToDisplay.map((item) => {
    return `
    <div class="best-seller-box" style=" display: flex; ">
    <div class="row">


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
})(productsDB);


function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "product.html";
}


let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];
function addedToCart(id) {
  let product = productsDB.find((item) => item.id === id);

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


let da = JSON.parse(localStorage.getItem("productsInCart"));
console.log(da.length);
