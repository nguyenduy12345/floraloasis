//GET PRODUCTS 
let products = JSON.parse(localStorage.getItem('PRODUCTS'))
let productList = document.querySelector('#product_list')
// let productFlowers = 
let listProducts = []
products.filter(product =>{
    if(product.type == "roses" || product.type =="tulips"){
        listProducts.push(product)
    }
})
let renderProduct = (list) =>{
    let listPost = document.createElement('div');
    listPost.classList.add('row')
    // listPost.classList.add('justify-content-between')
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
let pageList = document.querySelector('#flowers .product_page #page_list')
let listPage = (list) =>{
    let qtyPage = Math.ceil(list.length / limitPost)
    for(i = 1; i <= qtyPage; i++){
        let page = document.createElement('div')
        page.classList.add('btn')
        page.classList.add('btn_page')
        page.innerText = i
        pageList.appendChild(page)
        page.setAttribute('onclick', `changePage(${i})`)
        if(currentPage == i){
            page.classList.add('btn_page_active')
        }
    }
}
listPage(listPost)

//CHANGE PAGE 
let changePage = (i) =>{
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

//PREV PAGE
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
//SET CLASS ACTIVE FILTER
let filterItems =  document.querySelectorAll('.product_filter .product_filter_item') 
    filterItems.forEach(filterItem =>{
        filterItem.onclick = () =>{
            let activeFilter = document.querySelector('#flowers .product_filter .active') 
            if(activeFilter){
                activeFilter.classList.remove('active')
                filterItem.classList.toggle('active')  
            }else{
                filterItem.classList.toggle('active')
            }  
        } 
    })

// TITLE PRODUCT
let titleProduct = document.querySelector('#title_products')

//FILTER ALL 
function filterAll(){
        titleProduct.innerText = "FLOWERS"
        let currentListPost = productList.querySelectorAll('.product_list_item')
        for(let postItem of currentListPost){
            postItem.remove(postItem)
        }
        let currentPages = pageList.querySelectorAll('.btn_page')
        for(let page of currentPages){
            page.remove(page)
        }
        renderProduct(listProducts)
        let allListPort = productList.querySelectorAll('.product_list_item')
        loadPerPage(allListPort)
        listPage(allListPort)
        let listPagesCur = document.querySelectorAll('.btn_page')
        for(let listPageCur of listPagesCur){
            listPageCur.onclick = (i) =>{
                currentPage = i.target.innerText
                loadPerPage(allListPort)
                let thispage = pageList.querySelector('.btn_page_active')
                if(thispage){
                    thispage.classList.remove('btn_page_active')
                    listPageCur.classList.add('btn_page_active')
                }else{
                    listPageCur.classList.add('btn_page_active')
                }
            }
            let prevPage = document.querySelector('#prev_page')
            prevPage.onclick = (i) => {
                if(currentPage > 1){
                    currentPage--
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.toggle('btn_page_active')
                            listPagesCur[i - 1].classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(allListPort)
                }
            }
            let nextPage = document.querySelector('#next_page')
            nextPage.onclick = (i) =>{
                let qtyPage = Math.ceil(allListPort.length / limitPost)
                if(currentPage < qtyPage){
                    currentPage++
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.toggle('btn_page_active')
                            listPagesCur[i - 1].classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(allListPort)
                }
            }   
        }
        renderOtherProduct()
    }

// FILTER TYPE

// ROSE
let typeRose = document.querySelector('#type_rose')
    typeRose.onclick = () =>{
        titleProduct.innerText = "roses"
        let currentListPost = productList.querySelectorAll('.product_list_item')
        for(let postItem of currentListPost){
            postItem.remove(postItem)
        }
        let currentPages = pageList.querySelectorAll('.btn_page')
        for(let page of currentPages){
            page.remove(page)
        }
        let productRose = listProducts.filter(listProduct =>{
        return listProduct.type == 'roses'
        })
        renderProduct(productRose)
        let listPostRose = productList.querySelectorAll('.product_list_item')
        loadPerPage(listPostRose)
        listPage(listPostRose)
        let listPagesCur = document.querySelectorAll('.btn_page')
        for(let listPageCur of listPagesCur){
            listPageCur.onclick = (i) =>{
                currentPage = i.target.innerText
                loadPerPage(listPostRose)
                let thispage = pageList.querySelector('.btn_page_active')
                if(thispage){
                    thispage.classList.remove('btn_page_active')
                    listPageCur.classList.add('btn_page_active')
                }else{
                    listPageCur.classList.add('btn_page_active')
                }
            }
            // PREV ROSE
            let prevPage = document.querySelector('#prev_page')
            prevPage.onclick = (i) => {
                if(currentPage > 1){
                    currentPage--
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.toggle('btn_page_active')
                            listPagesCur[i-1].classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(listPostRose)
                }
            }
            // NEXT ROSE
            let nextPage = document.querySelector('#next_page')
            nextPage.onclick = (i) =>{
                let qtyPage = Math.ceil(listPostRose.length / limitPost)
                if(currentPage < qtyPage){
                    currentPage++
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.remove('btn_page_active')
                            listPageCur.classList.add('btn_page_active')
                        }else{
                            listPageCur.classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(listPostRose)
                }
            }   
        }
        renderOtherProduct()
    }
    

// TULIPS

let typeTulip = document.querySelector('#type_tulip')
    typeTulip.onclick = () =>{
        titleProduct.innerText = "tulips"
        let currentListPost = productList.querySelectorAll('.product_list_item')
        for(let postItem of currentListPost){
            postItem.remove(postItem)
        }
        let currentPages = pageList.querySelectorAll('.btn_page')
        for(let page of currentPages){
            page.remove(page)
        }
        let productTulip= listProducts.filter(listProduct =>{
        return listProduct.type == 'tulips'
        })
        renderProduct(productTulip)
        let listPostTulip = productList.querySelectorAll('.product_list_item')
        loadPerPage(listPostTulip)
        listPage(listPostTulip)
        let listPagesCur = document.querySelectorAll('.btn_page')
        for(let listPageCur of listPagesCur){
            listPageCur.onclick = (i) =>{
                currentPage = i.target.innerText
                loadPerPage(listPostTulip)
                let thispage = pageList.querySelector('.btn_page_active')
                if(thispage){
                    thispage.classList.remove('btn_page_active')
                    listPageCur.classList.add('btn_page_active')
                }else{
                    listPageCur.classList.add('btn_page_active')
                }
            }
            // PREV TULIP PAGE
            let prevPage = document.querySelector('#prev_page')
            prevPage.onclick = (i) => {
                if(currentPage > 1){
                    currentPage--
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.toggle('btn_page_active')
                            listPagesCur[i-1].classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(listPostTulip)
                }
            }
            // NEXT TULIP PAGE
            let nextPage = document.querySelector('#next_page')
            nextPage.onclick = (i) =>{
                let qtyPage = Math.ceil(listPostTulip.length / limitPost)
                if(currentPage < qtyPage){
                    currentPage++
                    i = currentPage
                    if(i == currentPage){
                        let thispage = pageList.querySelector('.btn_page_active')
                        if(thispage){
                            thispage.classList.remove('btn_page_active')
                            listPageCur.classList.add('btn_page_active')
                        }else{
                            listPageCur.classList.add('btn_page_active')
                        }
                    }
                    loadPerPage(listPostTulip)
                }
            }   
        }
        renderOtherProduct()
    }

//FILTER PRICE
let btnPrice = document.querySelector('.submit_price')
    btnPrice.onclick = () =>{
        let frPrice = document.getElementById('from_price')        
        let toPrice = document.getElementById('to_price')
        let errPrice = document.querySelector('.error_price')
        let valueRanges
        if(frPrice.value == ""){
            frPrice.value = 0
        }
        if(toPrice.value == ""){
            toPrice.value = 0
        }
        if(+frPrice.value > +toPrice.value){
            errPrice.innerText = "can't"
        }else{
            valueRanges= [{
                "min": frPrice.value,
                "max": toPrice.value
            }]
        }
        
        // GET PRODUCT PERPAGE 
        let listPostPage = []
        // GET LIST PRODUCT LOCAL
        let listProDuct = JSON.parse(localStorage.getItem('PRODUCTS'))
        // GET LIST PRODUCT
        let currentListPosts = document.querySelectorAll('.product_list_item')
            for( let listPost of currentListPosts){
                listProDuct.filter((item, key) =>{
                    if(listPost.id == item.id){
                        listPostPage.push(item)
                    }
                })
            }
        //GET ITEM range price
        let checkPostPrice = []
        if(valueRanges){
            for(let postPage of listPostPage){
                if(postPage.price >= valueRanges[0].min && postPage.price <= valueRanges[0].max){
                    checkPostPrice.push(postPage)
                }
            }
        }
        currentListPosts.forEach(item => item.remove(item))
        renderProduct(checkPostPrice)
        renderOtherProduct()
        let listPage = document.querySelectorAll('.btn_page')
        listPage.forEach(item => item.remove(item))
        listPage(checkPostPrice)
        
    }
function renderOtherProduct(){
    let listPosts = document.querySelectorAll('.product_list_item') 
        listPosts.forEach(listPost =>{
        listPost.onclick = () =>{
        window.location.href = `../../pages/showThatProduct/showproduct.html?productid=${listPost.id}`
    }
})
}
renderOtherProduct()  




