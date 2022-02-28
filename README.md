# Backend Kings Project Proposal

## Project Title
AJAX Pictures

## Team Members
- Faizan Riaz (1004927074, riazfai2)
- Justin Mach (1005146879, machjust)
- Kia naderi(1002886549, naderiki)
## Web App Description
- AJAX Pictures is a local theater website that allows users to look for movies to watch and book tickets for a viewing. By using OMDB and TicketMaster apis, the theater’s site will be able to create ticket bookings for authenticated users. Users can search for movies to view their plot, trailer (using the TrailerAddict api), casting and reviews. From here, they can either rent or stream the movie if it's an older movie or purchase tickets for playing movies. They can also leave their own reviews and ratings on each individual movie page. AJAX Pictures’s site collects data from the watched movies of each user in order to recommend other movies for said user to watch. New movies will be added either automatically for upcoming movies or manually by an admin.

## Key features for the beta
- Log in as user or admin. This means that the app should route user to the appropriate page depending on whether they logged in as a user or as an admin
  - As user, book movies and seating 
  - As admin, add new movies and timings to the website, along with other admin functions
- Displaying Movie times
- Booking a ticket (UI similar to seat map from cineplex)
  - View bookings
  - Cancel bookings
- Viewing a movie's info (director, actor, awards, ratings etc.), rating, commenting. This involves using API to fetch information about movies and displaying it in the U.I.

## Additional features for the final product
- Displaying trailers for each movie's page (Using the TrailerAddict api)
- Feature to rent/buy movies (old movies)
  - Display the services that stream or sell the movie
- Curating recommended movies (You watched this, we think you may enjoy…)
  - Create a feed of movies that the user may enjoy based on previous viewings
- On signup, ask user for favorite genres/actors and curate landing page for each user
- Automatically updating movie availability list based on upcoming movies

## Stack
- MERN
- React 
- GraphQl
  - Used to communicate between the front and backend
  - REST will also be used but only to make calls to the third party APIs in order to get data
- APIs	
  - OMDb 
    - For information on movies like director, cast, release date
  - TrailerAddict
    - To grab movie trailers to advertise to the user browsing movies
  - TicketMaster
    - To manage ticket bookings and events for the site

## Top 5 challenges
- Integrating 3 external APIs into app, they all work differently
  - The different APIs have their unique documentation and endpoints so it will be challenging to have all 3 work in unison in an orderly manner
- Creating an elegant UI for seat bookings
  - There needs to be very clear tells on where a seat is located in relation to the theater room (in the middle? Up front? In the back? Next to the entrance?) and what seats are taken by other users
- Algorithm for curating recommended movies list based on user preferences
  - We need to design an algorithm that is smart enough to learn user preferences for different users and then make a good guess towards what the user is likely to watch and click on. The algorithm doesn’t need to be as good as something like Youtube’s but it needs to be good enough
- Finding upcoming movies and updating website based on movies “coming soon”
  - We need to write code that will detect when a movie is coming up, classify it as that and then automatically classify it as now playing whenever the movie is released. 
- Different routes for user and admin (different UI and features allowed)
  - A user and an administrator (either an employee or the owner) will have different use cases and we will need to hide or omit some features depending on who is using it
