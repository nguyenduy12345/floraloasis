//GET PRODUCT
let listCake = JSON.parse(localStorage.getItem('PRODUCTS'))
//GET PRODUCT CAKE
let listProducts = []
listCake.forEach(product =>{
    if(product.type == "cakes"){
        listProducts.push(product)
    }
})
// RENDER PRODUCT
let productList = document.querySelector('#product_list')
let renderProduct = (list) =>{
    let listPost = document.createElement('div');
    listPost.classList.add('row')
    for(let i = 0; i < list.length; i++){
    listPost.innerHTML += `
    <div id=${list[i].id} class="product_list_item col-sm-12 col-md-6 col-lg-4 pe-2">
    <div class="product_img">
        <img src="${list[i].src}">
        <div class="product_cart text-uppercase"><i class="fa-solid fa-eye me-2"></i>View product</div>   
    </div>
    <div class="product-description">
        <div class="product_title">${list[i].name}</div>
        <div class="product_text pt-2">${list[i].intro}</div>
        <div class="product_price">Price: $${list[i].price}</div>
    </div>
    </div>`
    productList.appendChild(listPost)
    }      
}
renderProduct(listProducts)

// QUANTITY ITEM AT PAGE
let currentPage = 1
let limitPost = 9
let listPost = productList.querySelectorAll('.product_list_item')

let loadPerPage = (list) =>{
    let beginPost = limitPost * (currentPage - 1)
    let endPost = limitPost * currentPage - 1
    list.forEach((item, key) =>{
        if(key >= beginPost && key <= endPost){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    })
}
loadPerPage(listPost);

// QUANTITY PAGE
let pageList = document.querySelector('#page_list')
let listPage = (list) =>{
    let qtyPage = Math.ceil(list.length / limitPost)
    for(let i = 1; i <= qtyPage; i++){
        let page = document.createElement('div')
        page.classList.add('btn')
        page.classList.add('btn_page')
        page.innerText = i
        pageList.appendChild(page)
        if(i == currentPage){
            page.classList.add('btn_page_active')
        }
    }
}
listPage(listPost)
//CHANGE PAGE 
let pages = pageList.querySelectorAll('.btn_page')
for(let page of pages){
    page.onclick = () =>{
        currentPage = page.innerText
        loadPerPage(listPost)
        let thispage = pageList.querySelector('.btn_page_active')
        if(thispage){
            if(thispage){
                thispage.classList.remove('btn_page_active')
                page.classList.add('btn_page_active')
            }else{
                page.classList.add('btn_page_active')
            }
        }
    }
}
function changePage(i){
    currentPage = i;
    let pages = pageList.querySelectorAll('.btn_page')
    let thispage = pageList.querySelector('.btn_page_active')
    if(thispage){
        thispage.classList.remove('btn_page_active')
        pages[i-1].classList.add('btn_page_active')
    }else{
        pages[i-1].classList.add('btn_page_active')
    }
    loadPerPage(listPost)
}
// PREV PAGE
let prevPage = document.querySelector('#prev_page')
prevPage.onclick = (i) => {
    if(currentPage > 1){
        currentPage--
        i = currentPage
        changePage(i)
        loadPerPage(listPost)
    }
}

//NEXT PAGE
let nextPage = document.querySelector('#next_page')
nextPage.onclick = (i) =>{
    let qtyPage = Math.ceil(listPost.length / limitPost)
    if(currentPage < qtyPage){
        currentPage++
        i = currentPage
        changePage(i)
        loadPerPage(listPost)
    }
}

function renderOtherProduct(){
    let listPosts = document.querySelectorAll('.product_list_item') 
        listPosts.forEach(listPost =>{
    listPost.onclick = () =>{
        window.location.href = `/pages/showThatProduct/showproduct.html?productid=${listPost.id}`
    }
})
}
renderOtherProduct()