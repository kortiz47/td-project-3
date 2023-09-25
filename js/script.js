//Selector Variables

//Name Input Section
const name = document.querySelector('#name').focus();

//Job Input Section
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.style.display = 'none';
const jobRoleMenu = document.querySelector('#title');
jobRoleMenu.addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        otherJobInput.style.display = 'block';
    }else{
        otherJobInput.style.display = 'none'; 
    }
});

//T-Shirt Info Section
const shirtColor = document.querySelector('#color');
shirtColor.disabled = true;
const shirtDesign = document.querySelector('#design');

shirtDesign.addEventListener('change', (e)=>{
    shirtColor.disabled = false;
    const heartJS = document.querySelectorAll('[data-theme = "heart js"]');
    const jsPuns = document.querySelectorAll('[data-theme = "js puns"]');
    if(e.target.value === 'js puns'){
        for(let i=0; i<heartJS.length; i++){
            heartJS[i].style.display = 'none';
            jsPuns[i].style.display = 'block';
        }
    }else{
        for(let i=0; i<jsPuns.length; i++){
            jsPuns[i].style.display = 'none';
            heartJS[i].style.display = 'block';
        }
    }
    for(let i =0; i<jsPuns.length; i++){
        if(e.target.value === 'js puns' && heartJS){
            shirtColor.value = 'hidden';
        }else if(e.target.value === 'heart js' && jsPuns){
            shirtColor.value = 'hidden';
        }
    }
    
});

//Activities Section - cost
const activities = document.querySelector('#activities');
let balance = 0;
activities.addEventListener('change', (e)=>{
    const checkbox = e.target;
    const price = parseInt(checkbox.dataset.cost);
    const checked = checkbox.checked; //will store true or false - if true add price to balance, if false subtract price from balance
    if(checked){
        balance+=price;
    }else{
        balance-=price;
    }
    const activitiesBalance = document.querySelector('#activities-cost');
    activitiesBalance.innerHTML = `Total: $${balance}`;
});

//Payment Info Section
const payment = document.querySelector('#payment');
payment.children[1].selected = true;
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
paypal.style.display = 'none';
const bitcoin = document.querySelector('#bitcoin');
bitcoin.style.display = 'none';

//select credit card by default - payment.children[1]
payment.addEventListener('change', (e)=>{
    if(e.target.value === 'paypal'){
        paypal.style.display = 'block';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    }else if(e.target.value ==='bitcoin'){
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'block';
    }else{
        paypal.style.display = 'none';
        creditCard.style.display = 'block';
        bitcoin.style.display = 'none';
    }

});

//form validation
const form = document.querySelector('form');
const activitiesBox =  document.querySelector('#activities-box');
const inputs = activitiesBox.querySelectorAll('input');

function nameValidation(){
    const nameInput = document.querySelector('#name').value;
    const nameRegex = /\w+/;
    return nameRegex.test(nameInput);
}

function emailValidation(){
    const emailInput = document.querySelector('#email').value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    return emailRegex.test(emailInput);
}

function activitiesValidation(){
    const inputsChecked =[];
    for(let i=0; i<inputs.length; i++){
        const checked = inputs[i].checked;
        if(checked){
            inputsChecked.push(inputs[i]);
        } 
    }
    if(inputsChecked.length>=1){
        return true;
    }else{
        return false;
    }
}

function creditCardValidation(){
    if(payment.value === 'credit-card'){
        const cardNumRegex = /^\d{13,16}$/;
        const cardNumInput = document.querySelector('#cc-num').value;

        const zipCodeRegex = /^\d{5}$/;
        const zipCodeInput = document.querySelector('#zip').value;

        const cvvRegex = /^\d{3}$/;
        const cvvInput = document.querySelector('#cvv').value;

        if(cardNumRegex.test(cardNumInput) && zipCodeRegex.test(zipCodeInput) && cvvRegex.test(cvvInput)){
            return true;
        }else{
            return false;
        }
//come back to this - what would the return value be in credit card is not selected?
    }else{
        return true;
    }
}

form.addEventListener('submit',(e)=>{
    const name = nameValidation();
    const email = emailValidation();
    const activities = activitiesValidation();
    const payment = creditCardValidation();
    
    if(name && email && activities && payment){
        console.log('form submited');
    }else{
     e.preventDefault();
     console.log('not submitted')
    }
});

//8 - Activities Section tabbing
for(let i=0; i<inputs.length; i++){
    inputs[i].addEventListener('focus', ()=>{
        inputs[i].parentElement.className = 'focus';
    });
    inputs[i].addEventListener('blur', ()=>{
        const focus = activitiesBox.querySelectorAll('.focus');
        for(let i=0; i<focus.length; i++){
            focus[i].removeAttribute('class');
        }
        
    }); 
}

//9 - visual validation