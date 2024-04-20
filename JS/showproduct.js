//GET ID PRODUCT
const urlParam = new URLSearchParams(window.location.search)
const param = urlParam.get('productid')
// GET AND SHOW PRODUCT
let products = JSON.parse(localStorage.getItem('PRODUCTS'))
//FIND ID
let boxProduct = document.querySelector('#product')
let valueProductsCart = []
valueProductsCart = localStorage.getItem('PRODUCT_CART') ? JSON.parse(localStorage.getItem('PRODUCT_CART')) : [] ;
//SHOW PRODUCT
products.find(product =>{
    let categoryProduct = document.createElement('div')
    if(product.id == param){
        categoryProduct.innerHTML = `
        <div class="product_zone row ${product.id}">
            <div class="product_img col-sm-12 col-md-5">
                <div>
                <div class="big_img" id="big_img">
                    <img src="${product.src}">
                    <img src="${product.src}" id="zoom_img">
                </div>
                </div>
                <ul class="list_small_img">
                    <li class="small_img_item"><img src="${product.src}"></li>
                </ul>
            </div>
            <div class="product_attribute col-sm-12 col-md-7">
                <h4 class="product_name">${product.name}</h4>
                <p class="product_intro">${product.intro}</p>
                <span class="attribute_title">Price: </span><span class="product_price">$${product.price}</span> <br>
                <span class="attribute_title">Quantity: </span>
                    <ul id="quantity">
                        <li id="quantity_minus"><i class="fa-solid fa-minus"></i></li>
                        <li><input type="text" value="1" readonly id="quantity_value"></li>
                        <li id="quantity_plus"><i class="fa-solid fa-plus"></i></li>
                    </ul>
                <div class="product_size">
                    <span class="attribute_title">Size: </span>
                    <ul class="size_list">
                        <li class="size_option active">S</li>
                        <li class="size_option">M</li>
                        <li class="size_option">L</li>
                    </ul>
                </div>
                <div class="product_accessory">
                    <span class="attribute_title">Accessories:</span>
                    <ul class="list_accessory">
                        <li class="accessory_item">
                            <img src="../../img/accessories/binh-ve-hoa-sen-1579078281135761213270.webp">
                        </li>
                        <li class="accessory_item">
                            <img src="../../img/accessories/img_60f8e56b8eebc.jpg">
                        </li>
                        <li class="accessory_item">
                            <img src="../../img/accessories/boxgift.webp">
                        </li>
                    </ul>
                </div>
                <span class="attribute_title">Notes: </span>
                <input type="text" id="write_note" name="write_note" placeholder="Write notes...">
                <button class="add_to_cart">add to cart</button>
                <p class="message_add_cart"></p
            </div>
        </div> `
        boxProduct.append(categoryProduct)
        // BTN ADD TO CART 
        let btnAddCart = boxProduct.querySelector('.add_to_cart')
        btnAddCart.onclick = () =>{
            // GET PRODUCT LOCAL
            valueProductsCart = localStorage.getItem('PRODUCT_CART') ? JSON.parse(localStorage.getItem('PRODUCT_CART')) : [] ;
            //MESSAGE ADD CART
            let messageCart = document.querySelector('.message_add_cart')
            //CHECK ACCOUNT LOGIN
            let accountUser = JSON.parse(localStorage.getItem('NAME_LOGIN'))
            if(accountUser){
                //GET NOTES
                let noteProduct = boxProduct.querySelector('#write_note').value 
                //GET QUANTITY
                let quantityProduct = boxProduct.querySelector('#quantity_value').value
                //GET SIZE
                let checkSize = boxProduct.querySelector('.product_size .active').textContent
                valueProductsCart.find((item, key) => {
                    if(item.id == product.id){
                        valueProductsCart.splice(key, 1)
                    }
                })
                let valueProduct = {
                    'id': product.id,
                    'name': product.name,
                    'img': product.src,
                    'quantity': +quantityProduct,
                    'price': (product.price * quantityProduct),
                    'note': noteProduct,
                    'size': checkSize
                };
                valueProductsCart.push(valueProduct)
                localStorage.setItem('PRODUCT_CART', JSON.stringify(valueProductsCart));
                messageCart.innerText = "add cart success!"
                setTimeout(()=>{
                    messageCart.innerText = ""
                }, 4000)
                let cartProductItems = document.querySelectorAll('.item_product_cart')
                if(cartProductItems){
                    for(let cartProductItem of cartProductItems){
                        cartProductItem.remove(cartProductItem)
                    }
                }
                let btnCarts = document.querySelectorAll('.btn_cart')
                if(btnCarts){
                    for(let btnCart of btnCarts){
                        btnCart.remove(btnCart)
                    }
                }
                renderCart(valueProductsCart)
            }else{
                messageCart.innerText = "can't! please login."
            }
            removeItemCart()
        }
        zoomImg()
        activeSizeProduct()
    }
})

//ACTIVE SIZE
function activeSizeProduct(){
let sizeProducts = boxProduct.querySelectorAll('.size_option')
    if(sizeProducts){
    for(let sizeProduct of sizeProducts){
        sizeProduct.onclick = () =>{
            let sizeProductActive = boxProduct.querySelector('.product_size .active')
            if(sizeProductActive){
                sizeProductActive.classList.remove('active')
                sizeProduct.classList.toggle('active')
            }else{
                sizeProduct.classList.toggle('active')
            }
        }
    }
}
}
// QUANTITY
let quantityProduct = () => {
    let quantity = document.querySelector('ul#quantity')
    let quantityMinus = quantity.querySelector('li#quantity_minus')
    let quantityPlus = quantity.querySelector('li#quantity_plus')
    let quantityValue = quantity.querySelector('input#quantity_value')

    let current = 1
    quantityPlus.onclick = () =>{
        current++;
        quantityValue.value = current
    }
    quantityMinus.onclick = () =>{
        if(current > 1){
            current--
            quantityValue.value = current
        }else{
            quantityValue.value = current
        }
    }
}
quantityProduct()  
// RENDER PRODUCT CART
function renderCart(productCarts){
    //GET PRODUCT
    let cartLists = document.querySelectorAll('.cart_list')
    if(productCarts){
        // CART LENGTH ITEM
        let cartLengthItems = document.querySelectorAll('.cart_length')
        for(let cartLengthItem of cartLengthItems){
            cartLengthItem.innerText = productCarts.length
        }
        // RENDER PRODUCT CART
        for(let productCart of productCarts){
            for(let cartList of cartLists){
            let cartListItem = document.createElement('div')
            cartListItem.innerHTML = `
                <ul class="cart_list_item item_product_cart" id="${productCart.id}">
                    <li>${productCart.name}</li>
                    <li><img src="${productCart.img}"></li>
                    <li><span id="quantity_product">${productCart.quantity}</span></li>
                    <li>$${productCart.price}</li>
                    <li>${productCart.size}</li>
                    <li class="remove_item_cart"><i class="fa-solid fa-xmark del_item_product"></i></li>
                </ul> `
                cartList.append(cartListItem)  
            }
        }
        // SET BTN ADD CART
        for(let cartList of cartLists){
            let btnAddCart = document.createElement('div')
            btnAddCart.setAttribute("class","btn_cart")
            btnAddCart.innerHTML = `
                <p class="sum_price">Total: 0$</p>
                <a href="../../pages/myOrderPage/myorder.html"><button id="btn_order">SEND ORDER</button></a>`
            cartList.appendChild(btnAddCart)
        }
        //TOTAL PRICE
        let totalCartItems = document.querySelectorAll('.sum_price')
        let sumPrice = 0
        for(let productCart of productCarts){
            sumPrice += productCart.price
            for(let totalCart of totalCartItems){
                totalCart.innerHTML = `Total: ${sumPrice}$`
            }
        }
    }
}
renderCart(valueProductsCart)

function removeItemCart(){
    let iconRemoveCartItems = document.querySelectorAll('.remove_item_cart')
    if(iconRemoveCartItems){
        for(let iconRemove of iconRemoveCartItems){
            iconRemove.onclick = () =>{
                // REMOVE ITEM AT DOM
                let thisItem = iconRemove.parentElement
                thisItem.remove()
                //REMOVE ITEM AT DATABASE
                let thisIdItem = iconRemove.parentElement.getAttribute('id')
                let cartItemsLocal = localStorage.getItem('PRODUCT_CART') ? JSON.parse(localStorage.getItem('PRODUCT_CART')) : []
                let curProductCart = cartItemsLocal.filter(item =>{
                    return item.id !== thisIdItem
                })
                localStorage.setItem('PRODUCT_CART', JSON.stringify(curProductCart))
                let cartLengthItems = document.querySelectorAll('.cart_length')
                let lengthProductCart = JSON.parse(localStorage.getItem('PRODUCT_CART'))           
                    for(let cartLengthItem of cartLengthItems){
                        if(lengthProductCart){
                            cartLengthItem.innerText = lengthProductCart.length
                        }else{
                            cartLengthItem.innerText = 0
                        } 
                    }
                let totalCartItems = document.querySelectorAll('.sum_price')
                let sumPrice = 0               
                if(lengthProductCart){
                    for(let priceProduct of lengthProductCart){
                    sumPrice += priceProduct.price
                    for(let totalCart of totalCartItems){
                        totalCart.innerHTML = `Total: ${sumPrice}$`
                        }
                    }
                }
                if(lengthProductCart.length == 0){
                    for(let totalCart of totalCartItems){
                        totalCart.innerHTML = `Total: 0$`
                    }
                }
            }                  
        }              
    }
}
removeItemCart()

function zoomImg(){
// ZOOM IMG
let bigImg = document.querySelector("#big_img")
let zoomImg = document.querySelector('#zoom_img')
bigImg.onmousemove = (event) =>{
    zoomImg.style.opacity = 1
    // GET POSITION ZOOM IMG
    let positionElementX = event.x - bigImg.getBoundingClientRect().left
    let positionMouseX = (positionElementX / bigImg.offsetWidth) * 100
    let positionElementY = event.y - bigImg.getBoundingClientRect().top
    let positionMouseY = (positionElementY / bigImg.offsetHeight) * 100
    // console.log(`${positionMouseX}%`, `${positionMouseY}%`)
    // SET POSITION ZOOM IMG
    zoomImg.style.setProperty('--zoom-x', `${positionMouseX}%`)
    zoomImg.style.setProperty('--zoom-y',`${positionMouseY}%`)
    // SET TRANSFORM ZOOM IMG
    let translateX = -(positionMouseX - 50) / 2.5
    let translateY = -(positionMouseY - 50) / 2.5
    zoomImg.style.transform = `scale(1.8) translate(${translateX}% , ${translateY}%)`
}
bigImg.addEventListener('mouseout', () =>{
    zoomImg.style.opacity = 0
})
}
