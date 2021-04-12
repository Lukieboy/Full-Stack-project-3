/**=============================================================================
 * =============================================================================
 * =============================================================================
 * VARIABLES
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJobRole = document.querySelector('#other-job-role');
const select = document.querySelector('#title');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const jsShirts = document.querySelectorAll('.js-shirt');
const jsPuns = document.querySelectorAll('.js-puns');
const theme = document.querySelector('.theme');
const activities = document.querySelector('#activities');
const checkboxes = document.querySelectorAll('.activities input');
const cost = document.querySelector('#activities-cost');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const page = document.querySelector('body');
const creditCardInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const activitiesBox = document.querySelector('#activities-box');
const expMonth = document.querySelector('#exp-month');
const expYear = document.querySelector('#exp-year');
const register = document.querySelector('.register');
const actHint = document.querySelector('#activities-hint');
const selectHidden = document.querySelector('.select-hidden');
const activityInput = document.querySelectorAll('#activities input');
const options = document.querySelectorAll("#color option")
var total = 0;
/**=============================================================================
 * =============================================================================
 * =============================================================================
 * PRESETS
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */
name.focus();
otherJobRole.style.display = "none";
color.disabled = true;
payment.value = "credit-card";
payPal.style.display = "none";
bitcoin.style.display = "none";

/**=============================================================================
 * =============================================================================
 * =============================================================================
 * Event Listeners
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */

select.addEventListener('change', ()=>{
    JobRole();
})

design.addEventListener('change', ()=>{
    validateShirts();
});

activities.addEventListener('click', (e)=>{
    calculateTotal();
});


page.addEventListener('click', ()=>{
    checkPayment();
});

//=============================================================================
//submit event listener
//=============================================================================

document.addEventListener('submit', (e)=>{
    let hesf = validateForm();
    if(hesf === false){
        e.preventDefault();
    }
    register.style.display = "block"
    validateForm();
});

for (let index = 0; index < activityInput.length; index++) {
    activityInput[index].addEventListener('focus', ()=>{
        activityInput[index].parentNode.className -= "NaN";
        activityInput[index].parentNode.className += " focus";
    });
    activityInput[index].addEventListener('blur', ()=>{
        activityInput[index].parentNode.className -= "focus";
    });
}


setInterval(checkPayment, 100);




/**
 * =============================================================================
 * =============================================================================
 * =============================================================================
 * FUNCTIONS
 * =============================================================================
 * =============================================================================
 * =============================================================================
 */


 /**=============================================================================
  * CALCULATE ACTIVITY TOTAL FUNCTION
  * =============================================================================
  */

function calculateTotal(){
    total = 0;
    for (let index = 0; index < 7; index++) {
        if(checkboxes[index].checked === true){
            total += parseInt(checkboxes[index].getAttribute('data-cost'));
        }
    }
    cost.innerHTML = `Total: $  ${total}`;
}

/**
 * CHANGE SHIRTS
 */


function validateShirts(){
    if(design.value !== 'Select Theme'){
        color.disabled = false;

        if(design.value == 'js puns'){
            for (let index = 0; index < 3; index++) {
                jsShirts[index].style.display ="none";
                jsPuns[index].style.display ="inline";
            }
            theme.textContent = "JS Puns"
            options[0].selected = true;
            options[0].textContent = "Please select a color";

        }else{
           for (let index = 0; index < 3; index++) {
               jsPuns[index].style.display ="none";
               jsShirts[index].style.display ="inline";
           }
           theme.textContent = "JS Shirts"
           options[0].selected = true;
           options[0].textContent = "Please select a color";
        }
   }
}




function checkPayment(){
    if(payment.value === "paypal"){
        payPal.style.display = "block";
        bitcoin.style.display = "none";
        creditCard.style.display = "none";
    }else if(payment.value === "bitcoin"){
        payPal.style.display = "none";
        bitcoin.style.display = "block";
        creditCard.style.display = "none";     
    }else{
        payPal.style.display = "none";
        bitcoin.style.display = "none";
        creditCard.style.display = "block";     
    }
    document.querySelector('form').className = "";
}

function JobRole(){
    if(select.value === 'other'){
        otherJobRole.style.display = "block";
    }else{
     otherJobRole.style.display = "none";
    }
}


function addInvalid(element){
    element.parentElement.className -= " valid";
    element.parentElement.className += " not-valid";
    element.parentElement.lastElementChild.style.display = "block";
}

function addValid(element){
        element.parentElement.lastElementChild.style.display = "none";
        element.className -= " error-border";
        element.parentElement.className -= " not-valid";
        element.parentElement.className += " valid";

}

function validateForm(){
    calculateTotal();
    let emailValue = /^[^@]+@[^\.]+\.[a-z]*$/i.test(email.value);
    if(emailValue && name.value && total != 0 && /^\d{13,16}$/.test(creditCardInput.value)  && /^\d{5}$/.test(zipInput.value) && /^\d{3}$/.test(cvvInput.value)){
            return true;
            
        
    }else{

        if(!emailValue){ addInvalid(email) } 
        else{addValid(email)}

        if(!name.value){addInvalid(name)}
        else{addValid(name)}
        
        if(total == 0){
            activities.className = " activities not-valid";
            activities.lastElementChild.style.display = "block";
        }else{
            activities.className = " activities valid";
            actHint.style.display = "none";
            activitiesBox.className = "activities-box";
        }

        if(payment.value == "credit-card"){
        if(!/^\d{13,16}$/.test(creditCardInput.value)){addInvalid(creditCardInput)}
        else{addValid(creditCardInput)}

        if(!/^\d{5}$/.test(zipInput.value)){addInvalid(zipInput)}
        else{addValid(zipInput)}

        if(!/^\d{3}$/.test(cvvInput.value)){addInvalid(cvvInput)}
        else{addValid(cvvInput)}
        console.log(expMonth.value )
        if(expMonth.value != "Select Date"){ expMonth.style.border = "1px solid rgba(36, 28, 21, 0.2)"}
        if(expYear.value != "Select Year"){expYear.style.border = "1px solid rgba(36, 28, 21, 0.2)"}
        }
        

        return false;
    }
}
