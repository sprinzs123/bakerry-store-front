// all functions so far for front page
itemFilter()
nameSearch()
addToCart()
modalItemShow()
showCost()
showHowMany()
modalExpand()
// click event on the filter btns
function itemFilter(){
    allFilterBtns = document.querySelectorAll('.filter-btn')
    allFilterBtns.forEach(function(oneBtn){
        oneBtn.addEventListener('click', function(event){
            event.preventDefault()
            let value = event.target.dataset.filter;
            filterFunction(value);
        })
    })
}

// function for filtering out items by data-filter value
function filterFunction(filterData) {
    let allItems = document.querySelectorAll(".store-item");
     allItems.forEach(function(item) {
      if(filterData == 'all'){
        item.style.display = "block";
      }
      else{
        if (item.classList.contains(filterData)) {
          item.style.display = "block";
        }
         else {
          item.style.display = "none";
        }
      };
    });
  }

// search item by name
function nameSearch(){
    let searchBtn = document.querySelector('.name-search')
    searchBtn.addEventListener('click', function(even){
        let allItems = document.querySelectorAll(".store-item");
        let inputField = document.querySelector('#search-item').value;
        allItems.forEach(function(item){
            if(item.innerText.includes(inputField)){
                item.style.display = 'block'
            }
            else{
                item.style.display = 'none'
            }
        })
    })
}  

// add item to local storage after clicking add to cart btn
function addToCart(){
  let cartBtns = document.querySelectorAll('.add-cart-btn')
  // console.log(cartBtns)
  if (localStorage.getItem("cart") == null) {
    var cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cartBtns.forEach(function(cartBtn){
    cartBtn.addEventListener('click', function(event){
      let initial = cartBtn.parentElement.parentElement.parentElement
      itemId = initial.id.toString()
      let itemName = initial.querySelector('#store-item-name').innerHTML
      let itemPrice = initial.querySelector('#store-item-price').innerHTML
      let itemImg = initial.querySelector('.store-img').src
      if (cart[itemId] != undefined) {
        quantity = cart[itemId][0] + 1;
        cart[itemId][0] = quantity;
      } else {
        let quantity = 1;
        cart[itemId] = [quantity, itemName, itemPrice, itemImg];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(localStorage.getItem('cart'))
    })

  })
}

// #### display item from local storage into modal //

// getting information for each item from cart and passing it to other function
function modalItemShow(){
  if (localStorage.getItem("cart") == "null") {
    let cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  for (item in cart){
    let itemDetailList = cart[item]
    let itemName = itemDetailList[1]
    let itemQuantity = itemDetailList[0]
    let itemImgSrc = itemDetailList[3]
    let itemPrice = itemDetailList[2]

    addItemModal(itemName, itemQuantity, itemImgSrc, itemPrice)
  }
}
// add items dynamically to modal
// relies on modalItemShow() function
function addItemModal(name, quantity, imgSrc, price){
  let totalPrice = price * quantity
  let parentDiv = document.getElementById('modal-items')
  newItem = `
  <div class='row justify-content-around my-1 pl-2'>
    <div class="col-4">
        <img src="${imgSrc}" alt="omg" class='img-fluid my-auto'>
    </div>
    <div class="col-4 my-auto">
        <h6 class=''>${name}</h6> 
    </div>
    <div class='col-2 my-auto'>
        <h6>$<span class='item-price-modal'>${totalPrice}</span></h6>
    </div>  
    <div class="col-2 my-auto">
        <i class="fas fa-trash"></i>
    </div>
    </div>
    `
  createElement(parentDiv, newItem)
}
// create element and add it to designed parent container
function createElement(parent, newItem){
  let itemTry = document.createElement("div");
  itemTry.innerHTML = newItem;
  parent.appendChild(itemTry)
}

// calculate total amount using local storage
function totPrice(){
  if (localStorage.getItem("cart") == "null") {
    return 0
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let cost = 0
  for (item in cart){
    let itemDetailList = cart[item]
    let itemQuantity = itemDetailList[0]
    let itemPrice = itemDetailList[2]
    cost += itemQuantity * itemPrice
  }
  return cost
}
// show total cost at front page
function showCost(){
  let cost = totPrice()
  let modalTotal = document.querySelector('.modal-total-price')
  let navTotal = document.querySelector('.item-total')
  navTotal.innerHTML = cost
  modalTotal.innerHTML = cost
}

// calculate number of items using modal
function countItems(){
  let allItems = document.querySelector('#modal-items')
  if(allItems.hasChildNodes() == false){
    return 0
  }
  else{
    let childCount = allItems.children.length
    return childCount
  }
}
// show right total number of items in front page
function showHowMany(){
  let number = countItems()
  let navCount = document.querySelector('#item-count')
  navCount.innerHTML = number
}

// expand/dropdown modal
function modalExpand(){
  let modalToggleBtn = document.querySelector('#cart-info')
  let cart = document.querySelector('.cart')
  modalToggleBtn.addEventListener('click', function(event){
    cart.classList.toggle('modal-expand')
  })
}
