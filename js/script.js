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
    const selected = e.target;
    //Total Activities Cost
    const price = parseInt(selected.dataset.cost);
    const checked = selected.checked;
    if(checked){
        balance+=price;
    }else{
        balance-=price;
    }
    const activitiesBalance = document.querySelector('#activities-cost');
    activitiesBalance.innerHTML = `Total: $${balance}`;

    //Conflicting Activity Times
    const selectedDayAndTime = selected.dataset.dayAndTime;
    const sameDayAndTime = document.querySelectorAll(`[data-day-and-time = "${selectedDayAndTime}"]`);
    for(let i=0; i<sameDayAndTime.length; i++){
        const conflictingEvents = sameDayAndTime[i];
        conflictingEvents.disabled = selected.checked && conflictingEvents !== selected;
    }
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
const ccNum = document.querySelector('#cc-num');
const zipCodeNum = document.querySelector('#zip');
const cvvNum = document.querySelector('#cvv');

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

function cardNumberValidation(){
    if(payment.value === 'credit-card'){
        const cardNumRegex = /^\d{13,16}$/;
        const cardNumInput = ccNum.value;
        return cardNumRegex.test(cardNumInput);
    }else{
        return true;
    }
}

function zipCodeValidation(){
    if(payment.value === 'credit-card'){
        const zipCodeRegex = /^\d{5}$/;
        const zipCodeInput = zipCodeNum.value;
        return zipCodeRegex.test(zipCodeInput);
    }else{
        return true;
    }
}

function cvvValidation(){
    if(payment.value === 'credit-card'){
        const cvvRegex = /^\d{3}$/;
        const cvvInput = cvvNum.value;
        return cvvRegex.test(cvvInput);
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

function displayErrors(validator, validatorFunc){
    const selector = validator;
    const selectorParent = selector.parentElement;
    const selectorHint = selectorParent.querySelector('.hint');

    if(!validatorFunc()){
        selectorParent.classList.add('not-valid');
        selectorParent.classList.remove('valid');
        selectorHint.style.display = 'block';
    }else{
        selectorParent.classList.add('valid');
        selectorParent.classList.remove('not-valid');
        selectorHint.style.display = 'none';
    }
}

function emailDisplayError(){
    if(emailInput.value === ''){
        const emailHint = document.querySelector('#email-hint');
        emailHint.textContent = 'Email address field cannot be blank';
        displayErrors(emailInput, emailValidation);
    }else{
        const emailHint = document.querySelector('#email-hint');
        emailHint.textContent = 'Email address must be formatted correctly';
        displayErrors(emailInput, emailValidation);
    }
}

//SUBMIT EVENT LISTENER
nameInput.addEventListener('blur', ()=>{
    displayErrors(nameInput, nameValidation);
});

emailInput.addEventListener('blur', ()=>{
    emailDisplayError();
});

activitiesBox.addEventListener('click', ()=>{
    displayErrors(activitiesBox, activitiesValidation);
});

ccNum.addEventListener('blur', ()=>{
    displayErrors(ccNum, cardNumberValidation);
});

zipCodeNum.addEventListener('blur', ()=>{
    displayErrors(zipCodeNum, zipCodeValidation);
});

cvvNum.addEventListener('blur', ()=>{
    displayErrors(cvvNum, cvvValidation);
});
form.addEventListener('submit',(e)=>{
    const name = nameValidation();
    const email = emailValidation();
    const activities = activitiesValidation();
    const cardNumber = cardNumberValidation();
    const zipcode = zipCodeValidation();
    const cvv = cvvValidation();
    
    if(!name || !email || !activities || !cardNumber || !zipcode || !cvv){
        e.preventDefault();
        displayErrors(nameInput, nameValidation);
        emailDisplayError();
        displayErrors(activitiesBox, activitiesValidation);
        displayErrors(ccNum, cardNumberValidation);
        displayErrors(zipCodeNum, zipCodeValidation);
        displayErrors(cvvNum, cvvValidation);
    }
});