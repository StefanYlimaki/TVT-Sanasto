# This is a repository for Full Stack Project of Full Stack Open 2022

#### Application available at https://tvt-sanasto-frontend.vercel.app/
#### Dictionaries used are from https://gitlab.com/sanasto

# About this application

#### This is a application for Finnish students who want to learn the terminology of ICT-field. 
#### The application has a dictionary, with two category added so far.
#### The application also has games with which a student can learn the terminology of ICT-field in Finnish and in English.


# Getting started with this Application
This project's frontend is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the application on your own computer

### You will need:
* MONGODB_URI (in .env file in tvt-sanasto-api directory)
* PORT (in .env file in tvt-sanasto-api directory, for example PORT=3001)
* REACT_APP_BACKEND_URL (in .env file in tvt-sanasto-frontend directory, for example: localhost:3001/api/data/)

### Run the backend and frontend
** Remember to run `npm install` in both directories before running the commands below. 
* Run `npm run dev` in tvt-sanasto-api directory
* Run `npm start` in tvt-sanasto-frontend directory

Now the application should be running in a development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
If you see lint errors appear in the console of the frontend, run `npm run eslint -- --fix` (Depending on the OS this might not work!)

You can learn more of Create-React-App in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
