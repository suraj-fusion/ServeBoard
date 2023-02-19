# ServeBoard

This is my submission for Codex -iter dev stream february 2023.

## Tech Stack Used

Node.js | Express.js | Mongodb | EJS | Html | CSS | Javascript

## How to run this app in local system?

Make sure node.js is installed on your system.It can be installed from : https://nodejs.org/en/

I have inclued the nodemodules needed to run this app in the repo itself so it can be run directly

Clone this repository using `git clone https://github.com/suraj-fusion/ServeBoard.git` and cd into the directory

run the command `nodemon app.js` on terminal

visit http://localhost:3000 in order to access this webapp

## Description
It is simple webapp which helps users submit their request to a business.
It is divided into two sections for the users and another for the business

### Currently at this stage of the webapp it can handle only one business and multiple users but it can be later be developed for multiple businesses

### User Section

Users can initially Register and then login into the webapp

For registration and login i have used the bycrypt module from NPM

For the users it has 4 options which can be accessed through the navigation bar uptop:

1.Make a Demand -- users can submit their demands through a form(***currently the form only has text fields which can later be made into radio buttons and check boxes***)

2.Check status of their Demands--Users can check the status of their submitted demands

3.leave a feedback for the business--users can leave a feedback for the business

4.Chat with a business-users can chat with a business representative(***currenly only the frontend of chat feature is there***)



### Business Section

Businesses can initially Register and then login into the webapp

For the businesses it has 3 options which can be accessed through the navigation bar uptop:

1.Demands-Business can look through each demand submitted can update the status according to its convience which which will be displayed when user searches for the status of their demands

2.Feedback-Business can look through all the rating left by the users

3.Chat wih a user-Businesses can chat with a user (***currenly only the frontend of chat feature is there***)
