function renderCart(productCart){
    //GET PRODUCT
    let getProductCart = JSON.parse(localStorage.getItem('PRODUCT_CART'))
    let cartLists = document.querySelectorAll('.cart_list')
    if(getProductCart){
        // CART LENGTH ITEM
        let cartLengthItems = document.querySelectorAll('.cart_length')
        for(let cartLengthItem of cartLengthItems){
            cartLengthItem.innerText = getProductCart.length
        }
        for(let productCart of getProductCart){
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
        for(let cartList of cartLists){
            let btnAddCart = document.createElement('div')
            btnAddCart.setAttribute("class","btn_cart")
            btnAddCart.innerHTML = `
                <p class="sum_price">Total: $</p>
                <a href="/pages/myOrderPage/myorder.html"><button id="btn_order">SEND ORDER</button></a>`
            cartList.appendChild(btnAddCart)
        }
        //TOTAL PRICE
        let totalCartItems = document.querySelectorAll('.sum_price')
        let sumPrice = 0
        for(let productCart of getProductCart){
            sumPrice += productCart.price
            for(let totalCart of totalCartItems){
                totalCart.innerHTML = `Total: ${sumPrice}$`
            }
        }
    }
}
renderCart()

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
