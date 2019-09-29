# Messaging Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Git Repository

Git was used throughout development of the project as version control and progress management.
At all key feature implimentation stages, commits of the source code were generated.

The repository is organized into a number of seperate sub directories for each seperated part
of the application. The server side code responsible for client connection and permanent data
storage is located in the server folder in the root directory. This directory containes all 
Javascript source code and module information for the server and socket connections and text
files for user and group data.

The src directory contains the code for the front end angular pages that will be served to the
client. This includes all HTML, CSS and javascript for the client side pages and interaction 
with the backend server.

## Data Structures

In order to represent the abstract concepts of the website that are presented to the user, 
data structures that model their behaviour and interaction must be used. 

Each user that has a validated account on the websites server is stored in an array of 
Javascript objects. Each object in this array contains a reference to the users display
name and a reference to their `userLevel`. This user level is a numerical value between
1 and 4, this value determines the level of admin interaction allowed by that user. 
These values relate to the levels *User*, *Group Assist*, *Group Admin* and *Super Admin*
respectively.

Each group that is created for the website is likewise stored as an element in an array
of Javascript objects. Each group contains a `groupName`, an array of `rooms` and an array
of invited `users`. These arrays are responsible for displaying their relevant fields to 
client side of the application for users to interact with.

### Angular Architecture
The Angular framework separates sites into components, services and routes. This project
contains two invidual components that relate to the pages that will be displayed to the
user, each with an associated route that connects the pages. The initial route displays
the user with the login page component in which they must enter a username into. This information is
passed via socket connection to the connected node server for validation. The second route is then
navigated to once the user is validated, this is the dashboard component. This component is responsible
for displaying the main page content for the user including the groups and rooms the user is associated
with as well as any admin controls avaliable.

Two Angular services are also used for the site in order to maintain data persistence and 
a common server interface. The first service is the `user-information service` which is
responsible for containing a reference to a logged in user, ensuring that a users login
information is maintained throughout the application. In addition to this, the service
is responsible for saving and loading user validation information in local browser 
storage, which allows users to persist throughout sessions. The second service is
the `socket service`, this service is used as a standardized method to communicate 
between the Angular front end and the server including saving and requesting user and
group information.

### Node Server 
The back end node server is responsible connecting incoming client requests and serving
them the relevant information. The server was created using node.js and can be initialized
using the `node server.js` command in the relevant directory.

The server is responsible for larger and more secure data storage including infromation relating
to user data and group information. The `auth.js` file is responsible for user validation; the server
initially connects to a mongodb based database for the storage of user information and channel
information and history. The users collection stores the authentication information for each
user and will be queried for a successful login.

In addition to this, the `socket.js` module is responsible with communication between each
individually connected client the relevant data their account is granted access to from 
the server. This module uses the *socket.io* Javascript framework for this connection;
the server will wait for an incoming connection from a connected client socket and
based on the incoming socket message and data will save, load or return data from 
the mongo database and will return a JSON string of the resulting information 
found in the collections `users`, `channels` or `messages`.

## REST Api
The Angular front end communicates with the Node.js server using REST API's that 
send a http request to the server and return a JSON object file with the server
response.
The Initial route accessable from the angular front end is the login page. This 
page contains fields for the username and password of the user. when the login 
button is pressed, a JSON object containing the two input fields are sent to 
the authentication API where the details of the request are verified. The response
is then returned from the API to the client which will notify the user if the 
login attempt was successful.

Similarly the register API is presented from the register angular route. This API
will take the entered new user details and test if the account exists on the server.
if the account is created a confirmation response if send back.

The image storage API is used for uploading images to the server. This API takes 
an object formatted as a formidable form. If the format of this request is correct,
the image will be saved to specific directory and the location to it will be returned
in the form of a JSON object.
