# WTWR (What to Wear?): Back End

The WTWR (What to Wear) backend is an Express.js server designed to power a weather-based clothing recommendation application. It connects to a MongoDB NoSQL database to manage clothing items and user data. This server provides RESTful API endpoints for creating, retrieving, updating, and deleting clothing items, as well as managing user accounts. It includes error handling for invalid user input and server-side issues, ensuring a robust and reliable experience.

## Features

- Clothing item management

  - Add new clothing items to the database (authenticated)
  - Retrieve all clothing items from the database
  - Like or unlike clothing items (authenticated)
  - Delete clothing items (authenticated)

- User management

  - Create new user accounts
  - Sign into accounts with secure authentication
  - Update existing user profiles (authenticated)
  - Retrieve current user information (authenticated)

- Authentication and security

  - Secure user authentication using JSON Web Tokens (JWT)
  - Password hashing with bcrypt for enhanced security
  - Authentication middleware to protect routes
  - Helmet for securing HTTP headers
  - CORS to enable cross-origin resource sharing

- Database integration

  - Uses MongoDB to store and manage clothing items and user data
  - Defines Schemas/Models for clothing items and users to ensure consistent data structure

- Error handling
  - Validates user input and returns meaningfull error messages
  - Handles server-side errors gracefully

## Tech Stack

- Express.js: Framework for building the RESTful API
- MongoDB: Non-relational(NoSQL) database for storing clothing items and users
- Mongoose: ODM library for defining schemas and models, and interacting with MongoDB
- Node.js modules: Core system for importing and exporting functionality between files
- REST API: Provides structured endpoints for client-server communication
- Routes & Controllers: Organized routing and logic for handling requests.
- Custom Middleware: Enchances reqeust processing
- Custom validators: Ensures data integrity for incoming requests
- Error handling: System for managing client and server errors
- JSON Web Token (JWT): Used for secure user authentication
- bcrypt: Used for hashing and securing user passwords
- Helmet: Secures the application by setting various HTTP headers
- CORS: Enables cross-origin resource sharing for API access
- ESlint: Enforces code quality and consistency
- Postman: Used for testing and validating API endpoints

## Authentication details

- JSON Web Token (JWT): Upon successful login, users receive a JWT, which must be included in the Authorization header for protected routes.
- bcrypt: Passwords are hashed before being stored in the database, ensuring secure storage.
- Auth Middleware: Applied to all clothing item routes (except retrieving all items) and user profile updates to ensure only authenticated users can access these endpoints.
- Get Current User: A dedicated controller allows authenticated users to retrieve their own profile information.

## Domain names

- Front end: [wtwr-tripleten.jumpingcrab.com](wtwr-tripleten.jumpingcrab.com) / [www.wtwr-tripleten.jumpingcrab.com](www.wtwr-tripleten.jumpingcrab.com)

- Back end / API: [api.wtwr-tripleten.jumpingcrab.com](api.wtwr-tripleten.jumpingcrab.com)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
