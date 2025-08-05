# E-Commerce Backend API

## Description

This is a RESTful API built with Node.js, Express, and MongoDB for an e-commerce platform. It provides endpoints for managing categories, subcategories, brands, products, users, and authentication.

## Features

-   **Categories:** Create, read, update, and delete product categories.
-   **Subcategories:** Create, read, update, and delete subcategories, nested under categories.
-   **Brands:** Create, read, update, and delete product brands.
-   **Products:** Create, read, update, and delete products, with support for categories, subcategories, and brands.
-   **Users:** User registration, login, and management (admin only).
-   **Authentication:** Secure user authentication using JWT.
-   **Authorization:** Role-based access control (admin/user).
-   **Validation:** Data validation using express-validator.
-   **Error Handling:** Centralized error handling middleware.
-   **API Features:** Filtering, sorting, limiting fields, searching, and pagination.
-   **Rate Limiting:** Protects API from abuse using express-rate-limit.
-   **Email Support:** Sending emails for password reset functionality.

## Technologies Used

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcryptjs
-   express-validator
-   express-async-handler
-   dotenv
-   morgan
-   nodemailer
-   slugify
-   colors
-   eslint, prettier

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    -   Create a `config.env` file in the root directory.
    -   Add the following environment variables, replacing the values with your actual configuration:

        ```env
        PORT=8000
        NODE_ENV=development

        DB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ecommerce-db?retryWrites=true&w=majority&appName=Cluster0

        TOKEN_SECRET=<your-secret-key>

        EMAIL_HOST=smtp.gmail.com
        EMAIL_PORT=465
        EMAIL_USER=<your-email>
        EMAIL_PASSWORD=<your-email-password>
        EMAIL_USERNAME=Your Name <your-email>
        ```

4.  **Run the server:**

    ```bash
    npm run start:dev # For development
    npm run start:prod # For production
    ```

## Dummy Data Seeder

The project includes a seeder script to populate the database with dummy data.

*   To import data:

    ```bash
    node utils/dummyData/seeder.js -i
    ```

*   To delete all data:

    ```bash
    node utils/dummyData/seeder.js -d
    ```

## API Endpoints

The API provides the following endpoints:

### Category

*   `GET /api/v1/categories`: Get all categories
*   `GET /api/v1/categories/:id`: Get a specific category by ID
*   `POST /api/v1/categories`: Create a new category (Admin only)
*   `PUT /api/v1/categories/:id`: Update a category (Admin only)
*   `DELETE /api/v1/categories/:id`: Delete a category (Admin only)

### Subcategory

*   `GET /api/v1/subcategories`: Get all subcategories
*   `GET /api/v1/subcategories/:id`: Get a specific subcategory by ID
*   `POST /api/v1/subcategories`: Create a new subcategory (Admin only)
*   `PUT /api/v1/subcategories/:id`: Update a subcategory (Admin only)
*   `DELETE /api/v1/subcategories/:id`: Delete a subcategory (Admin only)
*   `GET /api/v1/categories/:categoryId/subcategories`: Get all subcategories for a specific category

### Brand

*   `GET /api/v1/brands`: Get all brands
*   `GET /api/v1/brands/:id`: Get a specific brand by ID
*   `POST /api/v1/brands`: Create a new brand (Admin only)
*   `PUT /api/v1/brands/:id`: Update a brand (Admin only)
*   `DELETE /api/v1/brands/:id`: Delete a brand (Admin only)

### Product

*   `GET /api/v1/products`: Get all products
*   `GET /api/v1/products/:id`: Get a specific product by ID
*   `POST /api/v1/products`: Create a new product (Admin only)
*   `PUT /api/v1/products/:id`: Update a product (Admin only)
*   `DELETE /api/v1/products/:id`: Delete a product (Admin only)

### User

*   `GET /api/v1/users`: Get all users (Admin only)
*   `GET /api/v1/users/:id`: Get a specific user by ID (Admin only)
*   `POST /api/v1/users`: Create a new user (Admin only)
*   `PUT /api/v1/users/:id`: Update a user (Admin only)
*   `DELETE /api/v1/users/:id`: Delete a user (Admin only)
*   `PUT /api/v1/users/changePassword/:id`: Change user password (Admin only)

### Logged User

*   `GET /api/v1/users/getme`: Get Logged User Data
*   `PUT /api/v1/users/updateme`: Update Logged User Data
*   `PUT /api/v1/users/changemypassword`: Update Logged User Password
*   `DEL /api/v1/users/deleteme`: Delete Logged User Data

### Auth

*   `POST /api/v1/auth/signup`: Register a new user
*   `POST /api/v1/auth/login`: Login user
*   `POST /api/v1/auth/forgotpassword`: Forgot password
*   `POST /api/v1/auth/verifyresetcode`: Verify reset code
*   `PUT /api/v1/auth/resetpassword`: Reset password

## Middlewares

*   **validatorMiddleware.js:** Catches errors from express-validator rules.
*   **errorMiddleWare.js:** Global error handling for the application.

## Models

*   Each model represents a schema for a specific entity in the database (Category, SubCategory, Brand, Product, User).

## Services

*   Each service contains the business logic for handling requests related to a specific entity.
*   **handlerFactory.js:** Contains reusable handler functions for common operations (CRUD).

## Utils

*   **apiError.js:** Custom error class for handling operational errors.
*   **apiFeatures.js:** Class for implementing API features like filtering, sorting, searching, and pagination.
*   **sendEmail.js:** Utility for sending emails.
*   **validator/:** Contains validation rules for different entities using express-validator.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

Mohamed Adel Elwekel

## License

[MIT](https://opensource.org/license/mit/)
