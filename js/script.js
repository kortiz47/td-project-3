//#2 - NAME FIELD: When the page loads, the initial focus of the page is on the name
const nameInput = document.querySelector('#name');
nameInput.focus();

//#3 - JOB ROLE SECTION: When the 'other' is selected on the job role menu, the text input for 'other' is displayed, otherwise it is hidden
const jobRoleMenu = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.hidden = true;

jobRoleMenu.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobInput.style.display = 'block';
    } else {
        otherJobInput.style.display = 'none';
    }
});

//#4 T-SHIRT INFO SECTION: when there are conflicting shirt designs and colors, conflicting options are hidden from the user and therefore are not able to select conflicting designs and colors
const shirtColor = document.querySelector('#color');
shirtColor.disabled = true;
const shirtDesign = document.querySelector('#design');
const shirtColorOptions = shirtColor.querySelectorAll('option[data-theme]');

shirtDesign.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    for (let i = 0; i < shirtColorOptions.length; i++) {
        const shirtColors = shirtColorOptions[i];
        if (e.target.value !== shirtColors.dataset.theme) {
            const firstOption = document.querySelector(`[data-theme = "${e.target.value}"]`);
            firstOption.selected = true;
            shirtColors.style.display = 'none';
        } else {
            shirtColors.style.display = 'block';
        }
    }

});

//#5 ACTIVITIES SECTION: allows users to register for activities and see their real-time updated balance. Extra credit was added as well to disabled events that are during conflicting dates and times
const activities = document.querySelector('#activities');
let balance = 0;

activities.addEventListener('change', (e) => {
    const selected = e.target;
    //Total Activities Cost
    const price = parseInt(selected.dataset.cost);
    const checked = selected.checked;
    if (checked) {
        balance += price;
    } else {
        balance -= price;
    }
    const activitiesBalance = document.querySelector('#activities-cost');
    activitiesBalance.innerHTML = `Total: $${balance}`;

    //CONFLICTING ACTIVITY TIMES - conflicting events that are at the same date and time are disabled when selected
    const selectedDayAndTime = selected.dataset.dayAndTime;
    const sameDayAndTime = document.querySelectorAll(`[data-day-and-time = "${selectedDayAndTime}"]`);
    for (let i = 0; i < sameDayAndTime.length; i++) {
        const conflictingEvents = sameDayAndTime[i];
        conflictingEvents.disabled = selected.checked && conflictingEvents !== selected;
        if (conflictingEvents.disabled) {
            conflictingEvents.parentElement.className = 'disabled';
        } else {
            conflictingEvents.parentElement.className = '';
        }
    }
});



//#6 PAYMENT INFO SECTION: A credit card is selected as the default payment method and all payment methods are hidden and shown based on the user's selected option
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//default payment view
payment.children[1].setAttribute('selected', 'selected');
paypal.hidden = true;
bitcoin.hidden = true;
//hide and show payment options
payment.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    } else if (e.target.value === 'bitcoin') {
        paypal.hidden = true;
        creditCard.hidden = true;
        bitcoin.hidden = false;
    } else {
        paypal.hidden = true;
        creditCard.hidden = false;
        bitcoin.hidden = true;
    }

});

//#7 FORM VALIDATION: name, email, activities, credit card number, zipcode, and cvv are all validated both to prevent the user from submitting the form if incorrect/incomplete and to show them their errors
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const activitiesBox = document.querySelector('#activities-box');
const activitySelections = activitiesBox.querySelectorAll('input');
const ccNum = document.querySelector('#cc-num');
const zipCodeNum = document.querySelector('#zip');
const cvvNum = document.querySelector('#cvv');

/**
 * nameValidation()
 * @param none
 * @returns boolean
 */

function nameValidation() {
    const nameValue = nameInput.value;
    const nameRegex = /\w+/;
    return nameRegex.test(nameValue);
}

/**
 * emailValidation()
 * @param none
 * @returns boolean
 */

function emailValidation() {
    const emailValue = emailInput.value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    return emailRegex.test(emailValue);
}

/**
 * activitiesValidation()
 * @param none
 * @returns boolean
 */

function activitiesValidation() {
    const activitySelectionsChecked = [];
    for (let i = 0; i < activitySelections.length; i++) {
        const activitiesSelected = activitySelections[i]
        const checked = activitiesSelected.checked;
        if (checked) {
            activitySelectionsChecked.push(activitiesSelected);
        }
    }
    if (activitySelectionsChecked.length >= 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * cardNumberValidation()
 * @param none
 * @returns boolean
 */

function cardNumberValidation() {
    if (payment.value === 'credit-card') {
        const cardNumRegex = /^\d{13,16}$/;
        const cardNumInput = ccNum.value;
        return cardNumRegex.test(cardNumInput);
    } else {
        return true;
    }
}


/**
 * zipCodeValidation()
 * @param none
 * @returns boolean
 */
function zipCodeValidation() {
    if (payment.value === 'credit-card') {
        const zipCodeRegex = /^\d{5}$/;
        const zipCodeInput = zipCodeNum.value;
        return zipCodeRegex.test(zipCodeInput);
    } else {
        return true;
    }
}

/**
 * cvvValidation()
 * @param none
 * @returns boolean
 */

function cvvValidation() {
    if (payment.value === 'credit-card') {
        const cvvRegex = /^\d{3}$/;
        const cvvInput = cvvNum.value;
        return cvvRegex.test(cvvInput);
    } else {
        return true;
    }
}

//#8 - ACCESSIBILITY
for (let i = 0; i < activitySelections.length; i++) {
    const activitiesSelected = activitySelections[i];
    activitiesSelected.addEventListener('focus', () => {
        activitiesSelected.parentElement.className = 'focus';
    });
    activitiesSelected.addEventListener('blur', () => {
        const focus = activitiesBox.querySelectorAll('.focus');
        for (let i = 0; i < focus.length; i++) {
            focus[i].removeAttribute('class');
        }

    });
}

//#9 VISUAL VALIDATION ERRORS
/**
 * displayErrors()
 * @param {variable} validator - takes in the variable that stores the element you want to focus on
 * @param {function} validatorFunc - takes the validator function associated with the focus element variable 
 */
function displayErrors(validator, validatorFunc) {
    const selector = validator;
    const selectorParent = selector.parentElement;
    const selectorHint = selectorParent.querySelector('.hint');

    if (!validatorFunc()) {
        selectorParent.classList.add('not-valid');
        selectorParent.classList.remove('valid');
        selectorHint.style.display = 'block';
    } else {
        selectorParent.classList.add('valid');
        selectorParent.classList.remove('not-valid');
        selectorHint.style.display = 'none';
    }
}

/**
 * emailDisplayError()
 * @param none
 * runs a conditional
 */

function emailDisplayError() {
    if (emailInput.value === '') {
        const emailHint = document.querySelector('#email-hint');
        emailHint.textContent = 'Email address field cannot be blank';
        displayErrors(emailInput, emailValidation);
    } else {
        const emailHint = document.querySelector('#email-hint');
        emailHint.textContent = 'Email address must be formatted correctly';
        displayErrors(emailInput, emailValidation);
    }
}

//REAL TIME VALIDATION ERRORS on blur or click events
nameInput.addEventListener('blur', () => {
    displayErrors(nameInput, nameValidation);
});

emailInput.addEventListener('blur', () => {
    emailDisplayError();
});

activitiesBox.addEventListener('click', () => {
    displayErrors(activitiesBox, activitiesValidation);
});

ccNum.addEventListener('blur', () => {
    displayErrors(ccNum, cardNumberValidation);
});

zipCodeNum.addEventListener('blur', () => {
    displayErrors(zipCodeNum, zipCodeValidation);
});

cvvNum.addEventListener('blur', () => {
    displayErrors(cvvNum, cvvValidation);
});

//SUBMIT VALIDATION ERRORS

/**
 * Final event listener to listen for errors when the form is submitted
 */
form.addEventListener('submit', (e) => {
    const name = nameValidation();
    const email = emailValidation();
    const activities = activitiesValidation();
    const cardNumber = cardNumberValidation();
    const zipcode = zipCodeValidation();
    const cvv = cvvValidation();

    if (!name || !email || !activities || !cardNumber || !zipcode || !cvv) {
        e.preventDefault();
        displayErrors(nameInput, nameValidation);
        emailDisplayError();
        displayErrors(activitiesBox, activitiesValidation);
        displayErrors(ccNum, cardNumberValidation);
        displayErrors(zipCodeNum, zipCodeValidation);
        displayErrors(cvvNum, cvvValidation);
    }
});