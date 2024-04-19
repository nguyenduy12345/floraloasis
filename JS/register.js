let accounts = [];
function registerForm(){
    //REGISTER FORM
    let registerForm = document.getElementById('register')
    // INPUT VALUE
    let username = registerForm.querySelector('input#username_register').value
    let email = registerForm.querySelector('input#email').value
    let phone = registerForm.querySelector('input#phonenumber').value
    let password = registerForm.querySelector('input#password_register').value
    let rePassword = registerForm.querySelector('input#re_password').value
    // ERRO MESSAGE
    let errUser = registerForm.querySelector('p#error_username')
    let errEmail = registerForm.querySelector('p#error_email')
    let errPhone = registerForm.querySelector('p#error_phone')
    let errPassword = registerForm.querySelector('p#error_password')
    let errRePassword = registerForm.querySelector('p#error_re_password')
    // REGEX
    let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    let regexPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
    // CHECK INPUT VALUE
    username.trim().length < 2 || +username.trim() ? errUser.innerHTML ="Please enter your username!" : errUser.innerHTML = "";
    !email.match(regexEmail) ? errEmail.innerHTML = "Please enter your email!" : errEmail.innerHTML = "" ;
    !phone.match(regexPhone) ? errPhone.innerHTML = "Please enter your number phone!" : errPhone.innerHTML = "";
    password.trim().length < 6 ? errPassword.innerHTML = "Password is very short, please enter more than 6 characters!" : errPassword.innerHTML = "";
    rePassword !== password ? errRePassword.innerHTML = "Password are not the same! Please enter your password again." : errRePassword.innerHTML = "";                  
    // BTN STATUS
    let sttBtnRegister = document.querySelector('p#register_success')
    if(errUser.innerHTML == "" && errEmail.innerHTML == "" && errPhone.innerHTML == "" && errPassword.innerHTML == "" && errRePassword.innerHTML== ""){
        sttBtnRegister.innerHTML = "Register Success!"
        accounts = localStorage.getItem('ACCOUNTS') ? JSON.parse(localStorage.getItem('ACCOUNTS')) : []
        accounts.push({
            'username': username, 
            'email': email, 
            'numberphone': phone, 
            'password': password
        })
        let inputs = document.querySelectorAll('input')
        for(let input of inputs){
            if(input.value != ""){
                // SET ITEM LOCALSTORAGE
                localStorage.setItem('ACCOUNTS', JSON.stringify(accounts))                             
            }
            input.value = ""
        }        
    }else{
        sttBtnRegister.innerHTML = "Register Failed!";
        // status = false;
    }   
}
let btnRegister = document.querySelector('button#btn_register')
btnRegister.addEventListener('click', (event) => {
    event.preventDefault()
    registerForm()
})




