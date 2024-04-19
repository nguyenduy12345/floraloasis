// GET LIST PRODUCTS
let listProducts = JSON.parse(localStorage.getItem('PRODUCTS'))
if(listProducts){
    for(let i = 0; i < 3; i++){
        ranDom(Math.floor(Math.random() * listProducts.length))
    }
    let index = Math.floor(Math.random() * listProducts.length)
    function ranDom(index){
        let productOther = document.querySelector('.product')
        let itemProduct = document.createElement('div')
        itemProduct.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3 p-1")  
        const products = []
        products.push(listProducts[index])
        for(let product of products){
            itemProduct.innerHTML = `
            <div class="product_list_item" id="${product.id}">
            <div class="product_img">
                <img src="${product.src}">
                <div class="product_cart text-uppercase"><i class="fa-solid fa-eye me-2"></i>View product</div>
            </div>
            <div class="product-description">
                <div class="product_title">${product.name}</div>
                <div class="product_text">${product.intro}</div>
                <div class="product_price">Price: $${product.price}</div>
            </div>
        </div>`
        productOther.appendChild(itemProduct)  
        }  
    }
    ranDom(index)
}
    // setInterval(()=>{
    //     let listItemsOther = document.querySelectorAll('.product_list_item') 
    //     if(listItemsOther){
    //         for(let itemOther of listItemsOther){
    //          itemOther.remove(itemOther)
    //         }
    //     }
    // if(listProducts){
    //     for(let i = 0; i < 3; i++){
    //         ranDom(Math.floor(Math.random() * listProducts.length))
    //     }
    //     let index = Math.floor(Math.random() * listProducts.length)
    //     function ranDom(index){
    //         let productOther = document.querySelector('.product')
    //         let itemProduct = document.createElement('div')
    //         itemProduct.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3 p-1")  
    //         const products = []
    //         products.push(listProducts[index])
    //         for(let product of products){
    //             itemProduct.innerHTML = `
    //             <div class="product_list_item" id="${product.id}">
    //             <div class="product_img">
    //                 <img src="${product.src}">
    //                 <div class="product_cart text-uppercase"><i class="fa-solid fa-eye me-2"></i>View product</div>
    //             </div>
    //             <div class="product-description">
    //                 <div class="product_title">${product.name}</div>
    //                 <div class="product_text">${product.intro}</div>
    //                 <div class="product_price">Price: $${product.price}</div>
    //             </div>
    //         </div>`
    //         productOther.appendChild(itemProduct)
    //         }  
    //     }
    //     ranDom(index)
    // }
    // renderOtherProduct()
    // }, 8000)

//GO TO SHOWPRODUCT PAGE
function renderOtherProduct(){
    let listPosts = document.querySelectorAll('.product_list_item') 
        listPosts.forEach(listPost =>{
    listPost.onclick = () =>{
        window.location.href = `/pages/showThatProduct/showproduct.html?productid=${listPost.id}`
    }
})
}
renderOtherProduct()
