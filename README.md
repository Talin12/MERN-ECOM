# MERN E-Commerce Platform

A full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Redux Toolkit for state management and modern frontend tooling including Vite, Tailwind CSS, and Shadcn UI components.

## Features

* **Product Browsing:** View a list of products on the homepage with images, ratings, and prices.
* **Product Details:** View detailed information about a single product.
* **Shopping Cart:** Add products to the cart, update quantities, and remove items.
* **User Authentication:** User registration and login functionality using JWT (stored in HTTP-Only cookies).
* **Checkout Process:** Multi-step checkout including shipping address entry, payment method selection, and order summary.
* **Order Placement:** Create new orders linked to the logged-in user.
* **Order History:** Users can view their past orders in their profile.
* **PayPal Integration:** Process payments using the PayPal SDK.
* **Modern UI:** Styled with Tailwind CSS and pre-built components from Shadcn UI. Animations powered by Framer Motion.

---
## Tech Stack 

* **MongoDB:** NoSQL database for storing product, user, and order data.
* **Express.js:** Backend framework for building the REST API.
* **React.js (with Vite):** Frontend library for building the user interface.
* **Node.js:** JavaScript runtime environment for the backend.
* **Redux Toolkit:** State management library for managing global application state.
* **Mongoose:** ODM for interacting with MongoDB.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **Shadcn UI:** Re-usable UI components built on Radix UI and Tailwind CSS.
* **Axios:** Promise-based HTTP client for making API requests.
* **JWT (JSON Web Tokens):** For user authentication.
* **bcryptjs:** For password hashing.

---
## Getting Started 

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd mern-ecom
    ```

2.  **Backend Setup:**
    * Navigate to the server directory:
        ```bash
        cd server
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `server` directory and add the following variables:
        ```env
        NODE_ENV=development
        PORT=5050
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret_key>
        PAYPAL_CLIENT_ID=<your_paypal_client_id>
        ```
    * **(Optional) Seed Database:** To populate the database with initial product data:
        ```bash
        npm run data:import
        ```
        To destroy existing data:
        ```bash
        npm run data:destroy
        ```
    * Start the backend development server:
        ```bash
        npm run dev
        ```
        The server should now be running on `http://localhost:5050` (or your specified PORT).

3.  **Frontend Setup:**
    * Navigate to the client directory (from the root):
        ```bash
        cd client
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * **(Optional) Environment Variables for Development:** If your backend is running locally on port 5050, the Vite proxy configuration should work out of the box. If you need to explicitly point to a different development backend, create a `.env.development` file in the `client` directory:
        ```env
        VITE_API_BASE_URL=http://localhost:5050
        ```
        *(Make sure your Redux slices prepend `import.meta.env.VITE_API_BASE_URL` to API calls if you use this)*
    * Start the frontend development server:
        ```bash
        npm run dev
        ```
        The frontend should now be running on `http://localhost:5173` (or another port specified by Vite).

---
## Available Scripts 📜

### Backend (`server` directory)

* `npm run dev`: Starts the backend server using `nodemon` for automatic restarts during development.
* `npm run data:import`: Imports seed product data into the database.
* `npm run data:destroy`: Deletes all product data from the database.

### Frontend (`client` directory)

* `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Builds the production-ready static assets into the `dist` directory.
* `npm run lint`: Runs ESLint to check for code quality issues.
* `npm run preview`: Serves the production build locally for previewing.

---
## Environment Variables 🔑

### Backend (`server/.env`)

* `NODE_ENV`: Application environment (`development` or `production`).
* `PORT`: Port the backend server will run on (e.g., `5050`).
* `MONGO_URI`: Connection string for your MongoDB database.
* `JWT_SECRET`: A secret key for signing JSON Web Tokens.
* `PAYPAL_CLIENT_ID`: Your PayPal application client ID for payment processing.

### Frontend (`client/.env.production`)

* `VITE_API_BASE_URL`: The absolute URL of your **deployed** backend API (e.g., `https://your-backend-api.onrender.com`). This is crucial for the production build to connect to the correct backend.

---
## API Endpoints 

The backend provides the following main REST API routes under the `/api` prefix:

* `/api/products`: Fetch all products or a single product by ID.
* `/api/users`: User registration (`POST /`) and login (`POST /login`).
* `/api/orders`: Create orders, get user-specific orders, get order details, update order payment status.

Protected routes require a valid JWT cookie.

---
## Deployment 

### Backend (Example: Render)

1.  Push your code to a Git provider (GitHub, GitLab).
2.  Create a new "Web Service" on Render.
3.  Connect your repository.
4.  Set the **Build Command** to `npm install`.
5.  Set the **Start Command** to `node server/server.js` (adjust path if needed).
6.  Add your environment variables (`MONGO_URI`, `JWT_SECRET`, `PAYPAL_CLIENT_ID`, `NODE_ENV=production`, `PORT=10000` or leave blank for Render default) in the Render dashboard.

### Frontend (Example: Netlify)

1.  Push your code to a Git provider.
2.  Ensure you have configured `VITE_API_BASE_URL` in `client/.env.production` pointing to your deployed backend URL.
3.  Ensure your API calls in the frontend code use `import.meta.env.VITE_API_BASE_URL`.
4.  Create a new site on Netlify and connect your repository.
5.  Set the **Base directory** to `client`.
6.  Set the **Build command** to `npm run build`.
7.  Set the **Publish directory** to `client/dist`.
8.  Add a `_redirects` file to your `client/public` directory with the content: `/* /index.html 200` to handle SPA routing.
9.  Deploy!