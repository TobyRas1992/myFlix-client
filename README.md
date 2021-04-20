# myFlix-client
This repo is for the client-side of my myFlix application built using the MERN stack. 

myFlix is an app that provides users with information on different films, directors, and genres from a movie database. 
Users can sign up, update their information, and add films to their list of favorites. 

## Motivation 
I wanted to built a client-side app that worked together with a movie database that I have built using Node.js, Express, and MongoDB.

## Screenshots

## Tech/framework used
**Built with**
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)

## Installation 
### Install dependencies
`npm install`
### Run
`parcel src/index.html`
### In Browser
`http://localhost:1234/`
## API Reference

## How to use?
- Log in or register new user. 
- After successful login/user registration, you will be forwarded to the main view, showing the full movie database. 
- Each movie is clickable and will open a new view with the movie's information and buttons to show more info on its genre and director. Here, the user can add the movie to their list of favorite movies by clicking "Add to favorites".
- In the navbar, you have three buttons available (Home, Profile, and LogOut).
- Home will redirect you back the the main view with the full movie database. 
- Profile will open the profile view, which renders the user's info and their list of favorite films. They also have the option to update their details or delete their profile. 
- LogOut will log out the user; redirecting you to the login view. 

## Credits

## App Info
### Author
Tobias Rasmussen
### Version
1.0.0
