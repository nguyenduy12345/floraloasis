let listProduct = localStorage.getItem('PRODUCT_CART') ? JSON.parse(localStorage.getItem('PRODUCT_CART')) : []
let zoneOrder = document.querySelector('.zone_order')
let total = document.querySelector('.order_total li.total')
let sum = 0
if(listProduct){
    let item = document.createElement('div')
    for(let product of listProduct){
        // <li id="quantity_minus"><i class="fa-solid fa-minus"></i></li>
        // <li id="quantity_plus"><i class="fa-solid fa-plus"></i></li>
        item.innerHTML += `
        <ul class="order_list" id="${product.id}">
            <li class="order_item">
                <div class="item_img">
                    <img src="${product.img}">
                </div>
                <div class="item_description">
                    <p class="item_name">${product.name}</p>
                    <p>Note: </p>
                    <p class="item_intro">${product.note}</p>
                </div>
            </li>
            <li class="item_price">
                <p class="item_title pe-1">Price:</p>
                <p>${product.price}$</p>
            </li>
            <li class="item_quantity">
                <ul id="quantity">
                    <p class="item_title">Quantity:</p>
                    <li><input type="text" value="${product.quantity}" readonly id="quantity_value"></li>
                    
                </ul>
            </li>
            <li class="item_size">
                <p class="item_title pe-1">Size:</p>
                <p>${product.size}</p>
            </li>    
        </ul>`
        zoneOrder.appendChild(item)
        total.innerHTML = `${sum += product.price}$`
    } 
}
function renderOtherProduct(){
    let listPosts = document.querySelectorAll('.order_list') 
    if(listPosts){
        listPosts.forEach(listPost =>{
            listPost.onclick = () =>{
                window.location.href = `/pages/showThatProduct/showproduct.html?productid=${listPost.id}`
            }
        })
    }
}
renderOtherProduct()

//FORM INFO USER
let formInfoUser = document.querySelector('#form_info_user')
let inputs = formInfoUser.getElementsByTagName('input')
if(inputs){
    for(let input of inputs){
        let parentEl = input.parentElement
        let message = parentEl.querySelector('.message')
        input.addEventListener('input', (e)=>{
            if(e.target.value.trim().length == 0){
                message.innerText = "Required field, please not emty!"
            }
            if(e.target.value.trim().length != 0){
                message.innerText = ""
            }
        })
    }
}
// CHECK OUT
let btnCheckOut = document.querySelector('.check_out')
let errMessage = document.querySelectorAll('.message')
let messageCheckOut = document.querySelector('.message_check_out')
let listOrder = localStorage.getItem('LIST_ORDER') ? JSON.parse(localStorage.getItem('LIST_ORDER')) : []
let infoUser
btnCheckOut.onclick = () =>{
    if(inputs){
        for(let input of inputs){
            let parentEl = input.parentElement
            let message = parentEl.querySelector('.message')
            if(input.value.trim().length == 0){
                message.innerText = "Required field, please not emty!"
            }else{
                message.innerText = ""
            }
        }
        for(let message of errMessage){
            if(message.textContent.length == 0){
                infoUser = {
                    'fullname': inputs[0].value,
                    'numberphone' : inputs[1].value,
                    'address' : inputs[2].value
                }
                messageCheckOut.innerText = "Congratulation! your order sent"
            }else{
                infoUser = []
                messageCheckOut.innerText = "Sent order failed"
            }
        }
    }
    if(infoUser.length !=0){
        listOrder = {
            'products' : listProduct,
            'info_user' : infoUser
        }
        localStorage.setItem('LIST_ORDER', JSON.stringify(listOrder))
    }
}
