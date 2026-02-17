# Assignment 6: Creating a Simple Web Server with Node.js
A basic web server built using Node.js `http` module that handles different routes and serves corresponding HTML pages for a Laundry Services website.

# Project Structure
laundryserver/
│
├── server.js              
├── README.md              
│
└── public/                
    ├── home.html          
    ├── about.html         
    ├── contact.html       
    ├── services.html      
    ├── 404.html           
    ├── styles.css         
    └── script.js          


# How to Run the Server
##Prerequisites
 Node.js should be installed on system

## Steps
1. Run the server
   Terminal
   node server.js
2. Open in browser
   http://localhost:3000

## Available Routes
http://localhost:3000/ Redirects to Home Page 200 
http://localhost:3000/home, Home Page 200 
http://localhost:3000/about, About Us Page 200 
http://localhost:3000/contact, contact Us Page 200 
http://localhost:3000/services, Services & Booking Page 200 
http://localhost:3000/invalid, 404 Error Page (any invalid route) 404 

## Technologies Used
 Node.js - Server-side JavaScript runtime 
 HTTP Module - Creating the web server 
 FS Module - Reading files from file system 
 Path Module - Handling file paths 
 HTML5 - Page structure 
 CSS3 - Styling and responsiveness 
 JavaScript - Client-side interactivity 
 Font Awesome - Icons 
 Google Fonts - Typography 

