
//SHOW & CLOSE NAVBAR
let navIcon = document.querySelector('.navbar_icon')
let navItemColumn = document.querySelector('.nav_item_column')
let closeNav = document.querySelector('#close_navbar')
navIcon.onclick = () => {
    navItemColumn.style.display = "block";
}
closeNav.onclick = () => {
    navItemColumn.style.display = "none";
}
// window.addEventListener = ('scroll', () =>{
//     let scrolled = window.scrollY;
//     console.log(scrolled);
// })


//NAVBAR & #TOP
window.onscroll = () =>{
    //BACK TO TOP 
    let backTop = document.querySelector('#back_to_top')
    let header = document.querySelector('header')
    if(document.documentElement.scrollTop > 600){
        backTop.style.display="flex"
    }else{
        backTop.style.display="none"
    }
    // NAVBAR FIXED
    if(document.documentElement.scrollTop > 80){
        header.style.position = "fixed"
        header.style.top = "0"
    }else{
        header.style.position = "relative"
        
    }
}

//FORM_LOGIN
let loginForm = document.querySelector('.box_login')
let btnCloseLogin = document.getElementById('close_form_login')
function showLoginForm(){
    loginForm.style.display= "block";
}
if(btnCloseLogin){
    btnCloseLogin.onclick = () => {
        loginForm.style.display = "none";
    }
}
//BOX SEARCHING
let boxSearching = document.querySelector('.box_searching')
function showBoxSearching(){  
    boxSearching.style.display = "block"
}
function closeBoxSearching(){
    boxSearching.style.display = "none"
}
//BOX CART
// CART LARGE SCREEN
let boxCart = document.querySelector('.box_cart')
function closeBoxCart(){
    boxCart.style.transform = "translateX(1000px)"
    setTimeout( () => {
        boxCart.style.display = "none"
    }, 600)
}
function showBoxCart(){
    boxCart.style.transform = "translateX(0)"
    boxCart.style.display = "block"
}
//CART LIST
let cartList = document.querySelector('.cart_list')
let iconCloseCart = document.querySelector('i#close_cart_list')
let showCart = document.querySelector('#shopping_cart')
showCart.onclick = () =>{
    cartList.style.display = "block"
}
// SLIDESHOW
let slideList = document.querySelector('#slide .slide_list')
let lists = document.querySelectorAll('#slide .slide_list .list')
let dots = document.querySelectorAll('.dots .dot_item')
let active = 0

function slideShow(){
    setInterval(() =>{
        active++ 
        if(active < lists.length){
            let widthLeft = lists[active].offsetLeft
            slideList.style.left = `${-widthLeft}px` 
        }else if(active == lists.length){
            active = 0 
            slideList.style.left = '0px'
        }    
    }, 5000)
}
function loadDots(){
    slideShow() 
    setInterval(()=>{
        if(active < dots.length){
            // Add class active
            let dotActive = document.querySelector('.dots .active')
            dotActive.classList.remove('active')
            dots[active].classList.add('active')
        }
    }, 5000)
}
loadDots()
dots.forEach((dot, key)=>{
    dot.addEventListener('click', () => {
        active = key
        let widthLeft = lists[key].offsetLeft
        slideList.style.left = `${-widthLeft}px`
        let dotActive = document.querySelector('.dots .active')
        dotActive.classList.remove('active')
        dots[key].classList.add('active')
    })
}) 
//END SLIDESHOW

//LOADING 
let loading = document.querySelector('.loading')
if(loading){
    window.onload = () =>{
        loading.style.display = "none"
    }
}

