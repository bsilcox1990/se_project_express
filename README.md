# WTWR (What to Wear?): Back End

The WTWR (What to Wear) backend is an Express.js server designed to power a weather-based clothing recommendation application. It connects to a MongoDB NoSQL database to manage clothing items and user data. This server provides RESTful API endpoints for creating, retrieving, updating, and deleting clothing items, as well as managing user accounts. It includes error handling for invalid user input and server-side issues, ensuring a robust and reliable experience.

## Features

- Clothing item management

  - Add new clothing items to the database
  - Retrieve all clothing items from the database
  - Like or unlike clothing items
  - Delete clothing items

- User management

  - Create new user accounts
  - Retrieve all users or a specific user by ID

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
- ESlint: Enforces code quality and consistency
- Postman: Used for testing and validating API endpoints

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
