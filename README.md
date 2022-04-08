# AJAX Pictures

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

https://ajaxpictures.me

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works.

https://youtu.be/PCwlk5TOLrM


## Project Description

**Task:** Provide a detailed description of your app

As frequent moviegoers ourselves, our goal with this project was to integrate our existing web development knowledge and learn the necessary skills to build a website similar to Cineplex.

This project/app uses the MERNG stack for the most part, without using Express. The database utilized by this app is mongoDB, while the framework used by this app is React, while node makes up the applications middle tier and GraphQL is used for all database interactions and endpoints. Our goal with this app was to create an application with features similar to Cineplex. AJAX Pictures is an online application created for a movie theater. It allows the movie theater manager to manage the operations related to the movie theater. The manager can log on to the application as an admin and has the ability to add movies, delete movies, and create timeslots for the movies. For example, if the manager would like to add showtimes for Toy Story, they would simply need to log on to the application using admin credentials and add Toy Story by clicking the “manage” section of the navigation bar. Once Toy Story has been added, the manager can choose any date within the following two weeks to add a date for the movie’s showtime. Then, the manager can add specific time and the theater number for said timeslot. The manager can also remove timeslots for any movie. On the other side, the application also provides UI for customers of the theater. If a user visits the website, they are able to view all the movies being shown in the theater. The user is able to register for an account with the movie theater as well, while existing users are able to log in to their existing profile. Upon registering, the new user has the option to select their favorite genre. Once they register and are logged in, a new column called “suggested” appears where movies with the user’s favorite genre appear. If the user opts out of selecting their favorite genre, the suggested movie column still appears but the movies in the column are not related to any specific genre. A logged in user is able to choose any movie and select a timeslot, as well as pick the specific seat(s) they would like to book. Once seats are booked, the user can manage bookings by clicking the manage section of the navigation bar. In this section, all of the users bookings appear, and the user is able to refund any seat they have booked. Refunded seats will now be able to be reserved by any user, while seats already booked appear as grayed out. Movie Data is retrieved from an API called OMDb, which allows users to see the movies data including the description, reviews, and director.


## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

To setup the website, we first created a mongo cluster on mongoDB. Then, the server folder was created to setup the database connection and the website’s critical features. Since we chose the MERN stack using graphQL, the first step was to use node (npm) to install apollo-server, graphql, and mongoose. All these libraries were essential in using graphql to communicate with the mongoose database. To setup the website and understand how graphql works, the first feature implemented was the login and register feature. To do so, the typeDefs file was created to create the user type. Then, the user’s resolvers were created and the necessary mutations and queries required for users’ processes were defined. Inside the server folder, the graphql folder handles anything related to the graphql such as creating resolvers for new types. The models folder is in charge of adding new models to the website, which initially only had the user model but was edited in the future to include the timeslot, movie, and ticket model. The utils folder is what houses user authentication and validates users. Once the user’s backend components were created, the client folder was created to house all front end components of the app. Initially, only the navigation bar was created and included a login and register button. Once the login feature was connected with the backend, it was time to work on the authorization. This used the apollo servers context argument to which includes information to determine if a user is authenticated or not. Inside the context, there is a request field which uses jwt to determine if a user is a valid user. This uses the jsonwebtoken library and its verify function to determine if the user’s token is valid or not. The front end, including the navigation bar and the buttons/fields for logging in/registering uses the Semantic-UI library.

OMDB API is used to cache movie information in the database. Youtube Data API is used to get the URL link for the movie's trailer. The query sent to youtube API is specific to match the OMDB API data. Multiple methods are provided in the backend that is used by various components in the app. One of these methods is the create movie method that takes the movie name and year and automatically adds all the movie data and the trailer URL. There is also a method that returns all the movies in the database related to a specific genre.

For purchasing a ticket, the feature uses Semantic-UI and the third-party react-seat-picker library. Semantic-UI is used for general frontend widgets like the labels used to showcase the date dropdown, time slot showings, and buttons to navigate to and from pages and purchasing. Graphql queries are used to get dates when the page loads and lazy queries are used in order to get showings for specific dates. The react-seat-picker is then used to showcase the current seating plan for the showing, and allows the user to pick a seat to then purchase. Mutations are used here in order to modify the backend to reserve seats and create tickets.

When a user purchases a ticket, it is important to allow the user to manage their bookings. So the next feature created was the bookings page that allows users to view their bookings. Once the query to get user bookings was created, Semantic-UI’s Grid and the javascript function map was used to list all the bookings of a user. Then, the button component imported from Semantic-UI was used to create the refund button. The refund button calls a mutation that remove the ticket from the database, as well as a mutation that removes the user’s timeslot from the calendar feature.

For administrator actions, we are using Semantic-UI and the third-party react-calendar library. Semantic-UI is used to display the movies and buttons like adding a new movie or managing current ones. We use an initial query to get all movies in the local database should the admin choose to manage existing movies. Semantic-UI and states are then used to allow the admin to search for a specific movie in the local database. Mutations are then used to delete the movies should they desire. When adding a new movie, queries are used to make search calls to OMDB to get movies that the admin wants to add. Clicking the movie when either adding or managing existing will take the admin to a more detailed view, where once again, we use queries, mutations, and Semantic-UI to get movie info, modify movie info, and display movie info. The third-party react-calendar component is used here to allow the admin to pick a specific date to create showings for. Currently it is set to restrict only allowing addings of 2 weeks in advance.

To create the suggested movies feature, a Semantic UI Dropdown of type Form was used to add the user’s favorite genre to the database. This field was stored within the user type. 


## Deployment

**Task:** Explain how you have deployed your application. 

AJAX Pictures is deployed with a Digital Ocean droplet, courtesy of Professor Thierry Sans, and is deployed using Docker, NGINX reverse proxy,  a Namecheap domain name and their BasicDNS and secured over HTTPS using certificates from LetsEncrypt. In Namecheap, the purchased domain, ajaxpictures.me, has 3 A records that are primarily used. One for the domain itself to point to the droplet’s IP. Another to have the subdomain ‘api’ point to the IP. Lastly, one to have a host www point to the IP. Using a docker-compose.yml file in the droplet’s root directory, which is also pushed on the repository, we get the SSL certificates and run the containers via the container repository. The frontend exposes port 3000 and the backend exposes port 5000.

To make deployment easier, we have implemented CI/CD using Github Actions with a build-client.yml and build-server.yml workflow. This would automatically build a new image, using the respective Dockerfiles, whenever a push is detected in the client or server directory on main and restart their respective containers to redeploy the changes in the code. It uses a private ssh key generated on the droplet to ssh into, and Justin’s personal access token to push the image to the GitHub Container Registry. All of this information is stored as GitHub secrets.


## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

As we use CI/CD, we would get noticed whenever there was an issue with deploying via email. Close eye was on console logs and network responses to see if there are any errors returned from backend api calls or frontend errors. In order to see how well the application worked, it was tested using different computers, at different locations and was also sent to various family and friends to gauge their experience and see if they found any issues.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. GraphQL Learning/Setup process 
    
    The graphql learning process was difficult since we were only used to working with endpoints using regular AJAX procedures. Integrating our own features through graphql including the models, queries, and mutations needed for our application were hard since they involved learning how graphql works and how to integrate it using react. Calling mutations and queries rather than endpoints was tough so it required a lot of researching to figure out how to introduce those into our application and our specific use cases.

2. Integrating APIs 

    Integrating APIs proved to be a difficult task because of two main reasons. The first was due to setting up the APIs; each had a process of setting up that was not straightforward. In particular, with the Youtube Data API, choosing the proper API to use out of the available Youtube APIs and the correct parameters for querying were complicated and required reading documentation. The second difficulty was in creating consistency among the results of both APIs. For instance, the trailer results were initially not for the right movie or were not a trailer. The solution was extensive experimentation until both APIs started working concurrently.

3. Deployment

    Deploying was overall one of the biggest challenges since none of the group members have any experience in deploying a website before. We had initial issues of getting a virtual machine, as we had problems obtaining Digital Ocean credits, and Microsoft Azure blocked students from creating virtual machines for some reason. After receiving one from Thierry, it took a lot of trial and error, as well as reading documentation in order to set up the droplet, domain, dns records and dockerize our app. We tried using other DNS services like cloudflare, but that provided issues with CI/CD that we didn’t have much time to look into. Figuring out how to set up the NGINX reverse proxy, setting up the Docker containers, getting the SSL Certificates and implementing CI/CD was definitely one of the most challenging aspects of the app and therefore one of the biggest things learned in developing the application.

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

**Faizan Riaz**

Faizan was in charge of setting up the app including connecting graphql to the mongoDB. Faizan also created the app structure including all the folders for the client and the server. This also includes initializing the graphQL files so in the future, adding queries and mutations was simple as there was already a structure about how to use graphQL. Faizan created all the features associated with the user, including logging in, logging out, registering and user authorization. Faizan also created the navigation bar component. Additionally, Faizan worked on the bookings management feature which included the refunding feature. Finally, Faizan worked on the user’s suggested movies feature.

**Justin Mach**

Justin was in charge of initializing the Mongo cluster and sending invites to the other team members. He worked on primarily 3 features throughout the project. The first being ticket purchasing. This includes the frontend and backend for choosing a date, choosing a showtime, picking seats and making a purchase given a selected movie from the user. The second feature he worked on was deployment. This includes obtaining a virtual machine, dockerizing the application, setting up NGINX reverse proxy, securing over HTTPS, and implementing CI/CD via GitHub actions. The last feature he worked on was administration which involves the frontend and backend of manipulating movies in the current local database and adding a new movie to the local database based off of a search from the admin. Manipulation of movies includes: deleting a movie from the local database, deleting showtimes and dates (and therefore respective tickets for showings that haven’t aired yet), and adding showtimes and dates. 


**Kia Naderi**

Kia developed the backend methods for adding new movies. This method automatically fetches all the movie info from OMDB and caches it into the database. Then, based on the Movie's name and year, it fetches the movie trailer URL from the Youtube open data API. Moreover, Kia created a method for querying movies based on genre. On the frontend, Kia created the Movie browsing feature, where users could scroll horizontally through different titles based on genre. He also made the navigation from browsing to a specific movie. Kia created the movie info page where users could see movie info and the trailer.


# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 

In the admin page, title, year and poster are shown when trying to add a new movie and nothing else (like plot, director etc.) as that is a limitation of OMDB. OMDB doesn’t return anything more than that when searching for multiple movies.

When searching for movies in OMDB, if there are too many results, the api won't return any movies. Thus, when searching for movies to add, typing in “The'' won't return anything. This raises issues when trying to add movies that have generic names. For example, if the administrator wants to add the horror movie ‘It’, there are simply too many results returned to properly get the movie the admin wants to add. Therefore, ‘It’ is impossible to add as a movie to our application. This is another limitation of using OMDB.

To test out the administration feature, log in with the following credentials that was used for testing purposes (we do recognize that these credentials are insecure):

	Username: admin
	Password: adminpassword

Since typical movie theater sites don’t have credits, we decided to list them out below rather than on its own page to keep the UI and design familiar to users to promote consistency which is one of the 8 Golden Rules of interface design.

# Credits

Code for common UI elements were derived from documentation, examples and code sandboxes from: https://react.semantic-ui.com/


Code to set up the seat picker was observed, derived, and modified from https://codesandbox.io/examples/package/react-seat-picker

Code to utilize the react calendar was gotten from: https://github.com/wojtekmaj/react-calendar

External APIs used:

	OMDB:
		https://www.omdbapi.com/
	Youtube Data API:
		https://developers.google.com/youtube/v3


Common code issues and inquiries was gotten from: https://stackoverflow.com/


Help with setting up apollo server and graphql: https://www.apollographql.com/docs/apollo-server/, https://www.youtube.com/watch?v=n1mdAPFq2Os&t=13574s


8 Golden Rules: https://www.cs.umd.edu/users/ben/goldenrules.html
