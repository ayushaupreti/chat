# Chat App
This project is a React application for a simple messaging app. \
Currently, this site is deployed with Firebase. Visit https://whatsappclone-ayu.web.app to view.\
<img width="1440" alt="Screenshot of chat app" src="https://user-images.githubusercontent.com/62811113/117836258-87c19e00-b246-11eb-9725-9ad492af40f7.png">

## Installation
Cloning this repository to your laptop gives you the option to work with the code and to run in locally in the development mode. \
To do so, simply run `git clone https://github.com/ayushaupreti/chat.git` wherever you would like to save it. \
To run locally, in the project directory, run `npm start` will begin the app. \
Open http://localhost:3000 to view it in the browser. \
The page will reload if you make edits. 

## Deployment
Once any changes are made, deploying the app is as simple as: \
`npm run build` \
`firebase deploy`

## Features/Functionality
This app uses a Firebase database to push and pull messages in realtime. \
Basic functionalities are as follows:
  - you can login with a Google account (firebase provides easy steps to setup Google authentication for login)

## Future Additions
Some ideas on future additions to this project:
  - Add private messaging 
  - Maintain login session
  - Store custom avatars for people in chatlist
  - Add modal prompt when creating new chat

