# 🛒 E-Commerce Backend API

This is a Node.js backend API for an E-Commerce application, built using **Express.js** and **MongoDB**. It provides core functionality for user management, product management, orders, authentication, and more.

---

## 🚀 Features

- User Authentication (JWT-based)
- Role-based access (admin/user)
- Product CRUD operations
- Email handling (via nodemailer)
- Rate limiting & security middleware
- Environment-based configuration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment management
- **nodemailer** for emails
- **express-validator** for input validation
- **morgan** for logging
- **eslint + prettier** for code linting and formatting

---

## ⚙️ Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/MoElwekel/E-Commerce-backend.git

2. **Install dependencies**

npm install

3. **Create .env file**

PORT=5000
NODE_ENV=development

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_HOST=**
EMAIL_PORT=**
EMAIL_USER=test@test.com
EMAIL_PASSWORD=example
EMAIL_USERNAME=example <test@test.com>

4. **Run the project**

For development:
npm run start:dev

For production:
npm run start:prod


---

🤝 Author
Developed by Mo Elwekel

---

📜 License
This project is licensed under the ISC License.
