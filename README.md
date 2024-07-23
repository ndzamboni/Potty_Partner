# Potty Partner App

Potty Partner is a web application designed to help users find bathrooms and leave reviews. Whether you’re traveling, in a new city, or just out and about, Potty Partner makes it easy to locate nearby restrooms and read user reviews to find the cleanest, most accessible options. This app aims to provide a community-driven resource for bathroom locations and conditions, ensuring that everyone has access to clean and safe facilities when they need them most.

## Link to Deployed App: https://potty-partner.onrender.com

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- Sequelize CLI

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Potty_Partner.git
   cd Potty_Partner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL database.
   - Update the `config/config.json` file with your database credentials.
   - Run migrations and seeders:
     ```bash
     npx sequelize db:migrate
     npx sequelize db:seed:all
     ```

4. **Start the application:**
   ```bash
   npm start
   ```

## Usage

- Navigate to 'render url here' to access the application.
- Register for an account or log in if you already have one.
- Find nearby bathrooms and leave reviews.

## Features

- User Authentication (Login/Register)
- Search for nearby bathrooms
- Leave and read reviews for bathrooms
- Secure routes for authenticated users

## Project Structure

```
Potty_Partner/
│
├── config/             # Configuration files (e.g., database config)
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── migrations/         # Database migrations
├── models/             # Sequelize models
├── public/             # Publicly accessible files (e.g., CSS, JS)
├── routes/             # Application routes
├── utils/              # Helper functions
├── views/              # Template files
├── server.js              # Main application file
├── package.json        # NPM package configuration
└── README.md           # Project README file
```

## Deployment

### Deploying to Render

1. **Create a PostgreSQL database on Render:**
   - Log in to your Render account.
   - Create a new PostgreSQL database instance and note the connection details.

2. **Deploy the application:**
   - Log in to your Render account.
   - Click on "New" and select "Web Service".
   - Connect your GitHub repository containing the Potty Partner project.
   - In the "Build Command" field, enter:
     ```bash
     npm install && npx sequelize db:migrate && npx sequelize db:seed:all
     ```
   - In the "Start Command" field, enter:
     ```bash
     npm start
     ```
   - Set the necessary environment variables, including your database connection details:
     ```
     DATABASE_URL=your_postgresql_connection_string
     NODE_ENV=production
     ```
   - Click "Create Web Service".

3. **Access your deployed application:**
   - Once the deployment is complete, Render will provide a URL where your application is accessible.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Creators
- Tristin Rohr [GitHub](https://github.com/TristinRohr)
- Nicholas Zamboni [GitHub](https://github.com/ndzamboni)
- Rob Wisniewski [GitHub](https://github.com/contra19)

<!-- screenshot demo -->

## Screenshots

Here are some screenshots of the Potty Partner web application:

![Landing Page](/demo/demo1.PNG)

![Login Page](/demo/demo2.PNG)

![Nav Bar](/demo/demo3.PNG)

![Themed Toggle](/demo/demo4.PNG)

![Profile Page](/demo/demo5.PNG)

![Search Restrooms](/demo/demo6.PNG)

![Restroom Page](/demo/demo7.PNG)

![Review Restroom](/demo/demo8.PNG)

![Generated Review](/demo/demo10.PNG)

![Commenting](/demo/demo9.PNG)

![About Us](/demo/demo11.PNG)




Feel free to explore the application and see how it looks in action!

