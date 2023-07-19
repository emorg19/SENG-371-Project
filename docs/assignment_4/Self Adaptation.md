# Self Adaptation

This application features self-adaptation in two ways. 

The first instance of self-adaptation is in the index page of the application. 
The buttons on this page change based on if the user is logged in or not. If the user is logged in the page will display buttons to navigate to differnt pages within the application.

The second instance is found throughout the app, specifically in the main, account, and budget pages. 
The tips information change on these pages depending on the users total account balance. If the users balance is less than $1000 a certain set of tips fitting a low balance are displayed in an MUI alert component with an error severity. If the users balance is between $1000 and $5000 a different set of tips fitting a medium balance are displayed in a MUI component with a warning severity. If the users balance is over $5000 another set of tips fitting a high balance are displayed in an MUI error component with a success severity. 
Lastly, if the users balance is over $10,000 investment information is displayed to the user rather than the usual budget information that is displayed ot users with a balance under $10,000.
