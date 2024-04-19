let itemUsers = document.querySelectorAll('li.item_user')
let itemCarts = document.querySelectorAll('li.item_cart')
export function login(){
    let loginForm = document.querySelector('#form_login')
    let userName = loginForm.querySelector('#username')
    let passWord = loginForm.querySelector('#password')
    let btnLogin = loginForm.querySelector('#btn_login')
    let errUser = loginForm.querySelector('p#error_username')
    let errPassword = loginForm.querySelector('p#error_password')
    let message = loginForm.querySelector('p.message_login')
    let boxLogin = document.querySelector('.box_login')
    btnLogin.onclick = () =>{
        let accounts = localStorage.getItem('ACCOUNTS') ? JSON.parse(localStorage.getItem('ACCOUNTS')) : []
        let check = accounts.find(account => {
            return account.username == userName.value && account.password == passWord.value;
        })
        if(check){
            let nameLogin = userName.value
            localStorage.setItem('NAME_LOGIN', JSON.stringify(nameLogin))
            message.innerText = "LOGIN SUCCESS"
            for(let itemUser of itemUsers){
                itemUser.innerHTML = `Hi: ${userName.value}`
            }
            for(let itemCart of itemCarts){
                itemCart.style.display = "block";
            }
            boxLogin.style.display = "none";
        }else{
            message.innerText = "LOGIN FAILED! PLEASE RE-ENTER"
        } 
        userName.value.trim() == "" ? errUser.innerText = "Please enter username!" : errUser.innerText = ""
        passWord.value.trim() == "" ? errPassword.innerText = "Please enter password!" : errPassword.innerText = ""     
    }
}
login()

let nameUser = JSON.parse(localStorage.getItem('NAME_LOGIN'))
for(let itemCart of itemCarts){
    itemCart.style.display = "none";
}
if(nameUser){
    for(let itemUser of itemUsers){
        itemUser.innerHTML = `Hi: ${nameUser}`
    }
    for(let itemCart of itemCarts){
         itemCart.style.display = "block";
    }
}

// LOG OUT
// let logOuts = document.querySelectorAll('button.btn_logOut')
//     for(let logOut of logOuts){
//         for(let itemUser of itemUsers){
//             itemUser.addEventListener('click', () =>{
//                 logOut.classList.toggle('.btn_logOut_hide')
//             })
//         }
//     }
    