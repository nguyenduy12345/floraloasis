// GET INPUT SEARCHING
let listBoxSearching = document.querySelectorAll('.box_search')
let listInputSearch = document.querySelectorAll('#searching')

//GET PRODUCTS
let productSearching = []
if(listInputSearch){
    for(let inputSearch of listInputSearch){
        inputSearch.addEventListener('input', () =>{
            let currentProducts = document.querySelectorAll('.product_searching')
            if(currentProducts){
                for(let currentProduct of currentProducts){
                    currentProduct.remove(currentProduct)
                }
            }
            productSearching = []
            let products = JSON.parse(localStorage.getItem('PRODUCTS'))
            products.filter(product => {
                let checkValue = product.name.toUpperCase().includes(inputSearch.value.toUpperCase())
                if(checkValue){
                    productSearching.push(product)
                }
            });
            if(inputSearch.value.length == 0){
                productSearching = []
                render(productSearching)
            }
            render(productSearching)
            goToShowProduct()
        })
    }
}
function render(){
    if(listBoxSearching){
            let productSearchSm = document.createElement('div');
            for(let product of productSearching){
                productSearchSm.innerHTML += `    
                <ul id="${product.id}" class="product_searching justify-content-start mt-2">
                <div class="img_item_searching me-2">
                    <li class="img_product_searching"><img src="${product.src}"></li>
                </div>
                <div class="descriptiong_item_searching">
                    <li class="title_product_searching">${product.name}</li>
                    <li class="intro_product_searching">${product.intro}</li>
                    <li class="price_product_searching">Price: <span>${product.price}$</span></li>
                </div>
                </ul>`;
                listBoxSearching[0].appendChild(productSearchSm);            
            }
            let productSearchLarge = document.createElement('div');
            for(let product of productSearching){
                productSearchLarge.innerHTML += `    
                <ul id="${product.id}" class="product_searching justify-content-start">
                <div class="img_item_searching me-2">
                    <li class="img_product_searching"><img src="${product.src}"></li>
                </div>
                <div class="descriptiong_item_searching">
                    <li class="title_product_searching">${product.name}</li>
                    <li class="intro_product_searching">${product.intro}</li>
                    <li class="price_product_searching">Price: <span>${product.price}$</span></li>
                </div>
                </ul>`;
                listBoxSearching[1].appendChild(productSearchLarge);            
            }
        }
        
    }  
function goToShowProduct(){
    let listPosts = document.querySelectorAll('.product_searching') 
        listPosts.forEach(listPost =>{
        listPost.onclick = () =>{
        window.location.href = `/pages/showThatProduct/showproduct.html?productid=${listPost.id}`
    }
})
}
goToShowProduct()  

// SEARCHING MOBILE
let mobSearching = document.querySelector('.item_searching')
let itemCart = document.querySelector('.cart_list')
if(mobSearching){
    mobSearching.onmousemove = () =>{
        itemCart.style.display = "none"
        mobSearching.style.height = "200px"
    }
    mobSearching.onmouseout = () =>{
        mobSearching.style.height = "30px"
    }
}