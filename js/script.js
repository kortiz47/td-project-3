//#2 - NAME FIELD: When the page loads, the focus is on the name
const nameInput = document.querySelector('#name');
nameInput.focus();

//#3 - JOB ROLE SECTION: When the 'other' is selected on the job role menu, show the text input
const jobRoleMenu = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.hidden = true;

jobRoleMenu.addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        otherJobInput.style.display = 'block';
    }else{
        otherJobInput.style.display = 'none'; 
    }

});

//#4 T-SHIRT INFO SECTION: when there are conflicting shirt designs and colors, conflicting options are hidden for user
const shirtColor = document.querySelector('#color');
shirtColor.disabled = true;
const shirtDesign = document.querySelector('#design');
const shirtColorOptions = shirtColor.querySelectorAll('option[data-theme]');

shirtDesign.addEventListener('change', (e)=>{
    shirtColor.disabled = false;
    for(let i=0; i<shirtColorOptions.length; i++){
        const shirtColors = shirtColorOptions[i];
        if(e.target.value !== shirtColors.dataset.theme){
            shirtColor.value = '';
            shirtColors.style.display = 'none';
        }else{
            shirtColors.style.display = 'block';
        }
    }
    
});

//#5 ACTIVITIES SECTION: allows users to register for activities and see their real-time updated balance
const activities = document.querySelector('#activities');
let balance = 0;

activities.addEventListener('change', (e)=>{
    const checkbox = e.target;
    const price = parseInt(checkbox.dataset.cost);
    const checked = checkbox.checked;
    if(checked){
        balance+=price;
    }else{
        balance-=price;
    }
    const activitiesBalance = document.querySelector('#activities-cost');
    activitiesBalance.innerHTML = `Total: $${balance}`;
});

//#6 PAYMENT INFO SECTION:
const payment = document.querySelector('#payment');

const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//default payment view
payment.children[1].setAttribute('selected', 'selected');
paypal.hidden= true;
bitcoin.hidden = true;

payment.addEventListener('change', (e)=>{
    if(e.target.value === 'paypal'){
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    }else if(e.target.value ==='bitcoin'){
        paypal.hidden = true;
        creditCard.hidden= true;
        bitcoin.hidden = false;
    }else{
        paypal.hidden = true;
        creditCard.hidden = false;
        bitcoin.hidden = true;
    }

});

//#7 FORM VALIDATION:
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const activitiesBox =  document.querySelector('#activities-box');
const activitySelections = activitiesBox.querySelectorAll('input');

function nameValidation(){
    const nameValue = nameInput.value;
    const nameRegex = /\w+/;
    return nameRegex.test(nameValue);
}

function emailValidation(){
    const emailValue = emailInput.value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    return emailRegex.test(emailValue);
}

function activitiesValidation(){
    const activitySelectionsChecked =[];
    for(let i=0; i<activitySelections.length; i++){
        const activitiesSelected = activitySelections[i]
        const checked = activitiesSelected.checked;
        if(checked){
            activitySelectionsChecked.push(activitiesSelected);
        } 
    }
    if(activitySelectionsChecked.length>=1){
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
    }else{
        return true;
    }
}

//#8 - ACCESSIBILITY
for(let i=0; i<activitySelections.length; i++){
    const activitiesSelected = activitySelections[i];
    activitiesSelected.addEventListener('focus', ()=>{
        activitiesSelected.parentElement.className = 'focus';
    });
    activitiesSelected.addEventListener('blur', ()=>{
        const focus = activitiesBox.querySelectorAll('.focus');
        for(let i=0; i<focus.length; i++){
            focus[i].removeAttribute('class');
        }
        
    }); 
}

//#9 VISUAL VALIDATION ERRORS
function errorMessageName(){
    const selector = nameInput;
    const selectorParent = selector.parentElement;
    const selectorHint = document.querySelector('#name-hint');
    if(!nameValidation()){
        selectorParent.classList.add('not-valid');
        selectorParent.classList.remove('valid');
        selectorHint.style.display = 'block';
    }else{
        selectorParent.classList.add('valid');
        selectorParent.classList.remove('not-valid');
        selectorHint.style.display = 'none';
    }
}

function errorMessageEmail(){
    const selector = emailInput;
    const selectorParent = selector.parentElement;
    const selectorHint = document.querySelector('#email-hint');
    if(!emailValidation()){
        selectorParent.classList.add('not-valid');
        selectorParent.classList.remove('valid');
        selectorHint.style.display = 'block';
    }else{
        selectorParent.classList.add('valid');
        selectorParent.classList.remove('not-valid');
        selectorHint.style.display = 'none';
    }
}

function errorMessageActivities(){
    const selector = activitiesBox;
    const selectorParent = selector.parentElement;
    const selectorHint = document.querySelector('#activities-hint');
    if(!activitiesValidation()){
        selectorParent.classList.add('not-valid');
        selectorParent.classList.remove('valid');
        selectorHint.style.display = 'block';
    }else{
        selectorParent.classList.remove('not-valid');
        selectorParent.classList.add('valid');
        selectorHint.style.display = 'none';
    }
}

function errorMessageCC(){
    const cardNumRegex = /^\d{13,16}$/;
    const cardNumInput = document.querySelector('#cc-num').value;
    const ccHint = document.querySelector('#cc-hint');
    if(!creditCardValidation()){
        if(!cardNumRegex.test(cardNumInput)){
            ccHint.parentElement.classList.add('not-valid');
            ccHint.parentElement.classList.remove('valid');
            ccHint.style.display = 'block';
        }else{
            ccHint.parentElement.classList.add('valid');
            ccHint.parentElement.classList.remove('not-valid');
            ccHint.style.display = 'none';
        }
    }
}

function errorMessageZipCode(){
    const zipCodeRegex = /^\d{5}$/;
    const zipCodeInput = document.querySelector('#zip').value;
    const zipCodeHint = document.querySelector('#zip-hint');
    if(!creditCardValidation()){
        if(!zipCodeRegex.test(zipCodeInput)){
            zipCodeHint.parentElement.classList.add('not-valid');
            zipCodeHint.parentElement.classList.remove('valid');
            zipCodeHint.style.display = 'block';
        }else{
            zipCodeHint.parentElement.classList.add('valid');
            zipCodeHint.parentElement.classList.remove('not-valid');
            zipCodeHint.style.display = 'none';
        }
    }
}

function errorMessageCVV (){
    const cvvRegex = /^\d{3}$/;
    const cvvInput = document.querySelector('#cvv').value;
    const cvvHint = document.querySelector('#cvv-hint');

    if(!creditCardValidation()){
        if(!cvvRegex.test(cvvInput)){
            cvvHint.parentElement.classList.add('not-valid');
            cvvHint.parentElement.classList.remove('valid');
            cvvHint.style.display = 'block';
        }else{
            cvvHint.parentElement.classList.add('valid');
            cvvHint.parentElement.classList.remove('not-valid');
            cvvHint.style.display = 'none';
        }
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
     errorMessageName();
     errorMessageEmail();
     errorMessageActivities();
     errorMessageCC();
     errorMessageZipCode();
     errorMessageCVV();
    }
});