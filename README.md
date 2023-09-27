# Treehouse Tech Degree Project 3: Interactive Form

_**Extra Credit Features**_

_Real Time Visual Validation_

I have incorporated real-time visual validation for the **name** input, the **email** input, the **activities** fieldset and credit card **number**, **zipcode**, and **cvv** inputs.

**For the name input,** I incorporated the real-time validation by invoking the **displayErrors** function to be triggered on the 'blur' event on the **nameInput** variable. For the user, this looks like real-time validation when they move on from the name input using either their mouse or tab and displays both error and resolved visual indicators.

The **email, number, zipcode, and cvv** inputs follow the same format and real-time validation as the **name input** and are all invoke the **displayErrors** function to be triggered on the 'blur' event. 

Finally the **activities** fieldset is follows a similar format and real-time validation to the other fields, but listens for a 'click' event on the activities-box rather than on 'blur'. 

_Conditional Error Message_

I incorporated a conditional error message on the **email input** field by creating a new function called **emailDisplayError** that incorporates the original **displayErrors** function that was created to give the user visual validation to be based on a conditional.

The conditional follows that if the value of the email input is blank or only contains spaces, then the HTML email-hint textContent is updated to be the string 'Email address field cannot be blank' and then our **displayErrors** function runs as usual. Otherwise, the email-hint textContent is updated to the string 'Email address must be formatted correctly' and our **displayErrors** function is run as normal and our **displayErrors** function then runs to check if our email is formatted correctly based on our regex.


