# WonderInk Blog

Welcome to the WonderInk Blog! This application allows users to read blog posts while admins can manage them. It features role-based access for normal users, admins, and super admins, all built with EJS and styled using Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Roles**:
  - **Normal User**: Read and search posts.
  - **Admin**: Add, delete, disable, and update posts.
  - **Super Admin**: Manage all posts and user roles.

- **Post Management**:
  - CRUD operations for posts (Create, Read, Update, Delete).
  - Ability to disable posts.

- **Responsive Design**: Fully responsive layout using Tailwind CSS.

## Dependencies

This project requires the following Node.js packages:

- **bcrypt**: Password hashing library for securing user passwords.
- **connect-mongo**: MongoDB session store for Express sessions.
- **cookie-parser**: Middleware for parsing cookies.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **ejs**: Embedded JavaScript templating engine for rendering HTML.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-ejs-layouts**: Middleware for using EJS with layouts.
- **express-session**: Middleware for managing sessions in Express.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens.
- **method-override**: Middleware for supporting HTTP verbs such as PUT and DELETE.
- **mongoose**: MongoDB object modeling tool.
- **morgan**: HTTP request logger middleware for Node.js.
- **nodemon**: Utility that monitors for changes in your source and automatically restarts your server.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/wonderink.git
