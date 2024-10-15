# URL Shortening Tool

A simple URL shortening tool built with **Node.js** for the backend and **React** for the frontend. This project allows users to shorten long URLs and retrieve the original URL by using the shortened link.

## Features

- Shorten any long URL to a unique short link.
- Redirect to the original URL when the shortened URL is accessed.
- Simple, clean user interface to input and display shortened URLs.
- Built-in URL validation to ensure valid URLs are shortened.

## Tech Stack

### Backend
- **Node.js**: A JavaScript runtime for building the server-side API.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database for storing the original URLs and their shortened counterparts (you can also use other databases like MySQL, PostgreSQL, etc.).

### Frontend
- **React**: A front-end JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.

### Additional Libraries
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **URL-parse**: For validating and parsing URLs.
- **Shortid**: To generate unique shortened URLs.
- **dotenv**: For environment variable management.