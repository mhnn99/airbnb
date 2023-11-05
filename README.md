# HomesAndCondoRentals


## Project description:
This is a project that we've created a website where you'd be able to create an account and afterwards look for rental units based on the location specified and book it if the timeframe selected is available, followed by a prompt to make a review for the experience.
![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/93460361-03a2-4ef1-83dc-2b8239955d38)


 ## Tehnologies Used : 
- MongoDB : Utilized for storing the users along with their details, the bookings created for the listings, and the reviews made for the listings.
- ExpressJS : Employed as the web application framework for Node.js to handle the server-side development, routing, and middleware integration.
- React : Utilized for building the website's frontend, providing a dynamic and efficient user interface for seamless user interaction.
- NodeJS : Utilized for emulating the server-side of the website, enabling efficient and scalable handling of concurrent connections and requests.


## Challenges :
- Session Tokens : Implementing secure session management and handling session tokens efficiently to ensure user authentication and authorization while maintaining data integrity and security.
- Storing the data on MongoDB : Ensuring effective data modeling and management for storing user information, booking details, and reviews in the MongoDB database, optimizing data retrieval and minimizing potential data inconsistencies.
- Secure Communication: Implementing secure communication protocols (such as HTTPS) to protect sensitive data during transmission, ensuring data confidentiality and integrity between the client and the server.


## Setup
### Backend setup
- Access the `server` directory via a new terminal and run the command `npm install`
- After the installation is completed, run one of the following commands `nodemon server` or `npx nodemon server`
- You should be prompted with a message in the console that the server-side is currently running:
![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/8e826be6-079e-46b6-bb9f-aadb887a7ed8)


### Frontend setup
- Access the `client` directory via a new terminal and run the command `npm install --force` in order to install React and all the other dependencies
- After the installation is completed, start the website with the command `npm start`
- The website shall open within a new tab in the default browser configured with the route `http://localhost:3000/`


## How to use 
### Registration
- In order to register you will have to click on the `LOGIN / REGISTER` option from the top right corner, afterwards you'll be redirected to the Sign-Up/Sign-In page. 
- `!!` Since this project was made on our own cluster, you'll need to have the IP Address whitelisted in order to be able to register a new user within the database`!!`
- The two options of Sign-Up and Sign-In can be switched in between by clicking on their specific `Tabs`.
- REGISTER
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/c1d37bf6-5bfb-4e66-94a3-62cc61709618)
- LOG-IN
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/80c22780-ee90-4c99-a745-ceb50e4d1e19)
- Within the Log-In tab we can find a `Forgot Password` option that once clicked will ask you to input the `Email address` associated with your existing account and the `New Password` that you'd like to have on your account
![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/e417384f-4dcd-4794-97cb-1a99a3da391b)

### Main Page navigation
- Once you've successfully logged in, you will be prompted with a `Snack Bar` that'll confirm the log in process was successful and you will have a default avatar based on your First Name, that once clicked will give you the options to navigate to your `Account` or to `Log out`
 ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/a664f9ec-2984-4a53-a461-96bdddb4b081)
 ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/472e9ae2-243c-4ca8-98e3-03968d3ae462)
- If you'll click the `GET STARTED` button you will scroll to a selection of fifteen popular locations that are animated with `Parallax Layers` on each scroll, which once clicked will redirect you to that location's `Available Listings`
- Desktop
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/9268ba12-ba17-486f-b12f-1498cbddc93a)
- Tablet
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/10b75289-f309-48a4-bace-98de23495f10)
- Mobile
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/5be2d9df-6b3a-46e0-bca5-fbaa4b8caf24)
- Once you've scrolled past all the popular locations you will have find at the bottom of the page the `Footer` alongside the `Back-To-Top` button that will scroll you back up.
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/68e29bcf-3866-448c-b55e-988137961300)

### Listings search
- Once you've clicked on a location or selected a search result from the `Navbar's search option's results`, you shall be redirected to a page that will show the `Listings` found for the location, additionally you can sort the listings by `Price/night` or `Rating` ascending or descending
- Desktop
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/4cbe054e-a19a-4f0b-b106-df0851143e1c)
- Tablet
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/88f90cf2-ba82-4085-9b74-627f067824e2)
- Mobile
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/208f5c2d-9e55-47f1-8e14-f3a9c1e4dfe3)
- Each card has the `Listing's first image`, `Listing's name`, `Host's avatar`, `Average rating alongside the number of reviews`, `Price/night`, `If the host is a SuperHost or not` and by clicking/tapping on the `+` button you will have two options:
- `Add to favorites` : which will add the listing to your `Favorites` list, that can be later removed/accessed to check the availability from the `Account` page
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/5552e14f-bc77-4aa1-9c28-dcf52555e713)
- `Check availability` : which will redirect you to the listing's page where you can book it for a timeframe
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/94894e9d-fd51-4536-96a8-137a3f9dd0cd)

### Listing 
- Once you've accessed a `Listing` you shall find all of it's details including:
- `Listing Type`
- `Photos` that are animated automatically on a slider
- `Number of rooms and bathrooms`
- `Amenities List`
- `Reviews` that are within our DB
- `Reservation detaills` required if you're willing to book
- Desktop
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/56697ed4-834f-4a3c-9492-992ad0aecff0)
- Tablet
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/4f05cd36-3a18-49d3-991f-870e78667f98)
- Mobile
- ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/0fceee75-5593-4cc9-9860-002aef3fa050)
- Once you've inserted the `Check in date` and the `Check out date` if they are not grayed out ( already occupied ) you shall be prompted with the message that your booking was successfull
  ![image](https://github.com/alexvieru1/HomesAndCondoRentals/assets/120309136/07fe560c-7491-427d-a6df-f32c10cdb3eb)
