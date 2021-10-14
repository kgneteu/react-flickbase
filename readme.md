## Table of contents
- [Description](#description)
- [Technologies](#technologies)
- [Setup](#setup)
- [Config](#config)



## Decription <a name="description"></a>
Movie database written in React. It is a fullstack application that demonstrates the use of several important functionalities:
- user authorization (with email verification)
- dashboard that allows you to manage the list of articles and their categories
- using GMail in the Node
- infinite scroll and many more

## Technologies <a name="technologies"></a>
- React
- Mongo / Mongoose
- Node
- Express
- Material-ui

## Setup <a name="setup"></a>
- Create your own Mongo database
- Clone this repository
- run <code>npm install</code> in the main project directory
- change dir to <code>client</code> directory and run <code>npm install</code> again
- change dir to root directory
- create <code>.env</code> file and put in it the data described in the config section
- run npm run dev - to run this project in development mode

## Config <a name="config"></a>
In order to work properly, the project requires setting of several environment variables. We put these variables in the .env file (development environment), and then we have to set them in the production environment (the configuration depends on the server we use).
The following is an example of the contents of the .env file:

DATABASE = mongodb+srv://admin:example@balah.s52fb.mongodb.net/myFirstDatabase?RetryWrites=true&w=majority
SECRET = SomeSecretet!!!
EMAIL_PASSWORD = dddddds
EMAIL=example@gmail.com
EMAIL_MAIN_URL = http://localhost:3000/
SITE_DOMAIN = http://localhost:3000/

### Variables description:
DATABASE - your MongoDb connection string
SECRET - a string used to generate JWT tokens (should be unique)
EMAIL_PASSWORD - password for your Google Account (in the form of a token generated on the Google account page)
EMAIL - your e-mail address
EMAIL_MAIN_URL - your site's domain used in the generated emails
SITE_DOMAIN - site domain name


