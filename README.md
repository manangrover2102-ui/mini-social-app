🧩 Mini Social Media App

A clean and modern mini social media application that allows users to sign up, log in, create posts, like posts, and comment in real time.
Built with a full-stack MERN approach and deployed successfully.

🚀 Live Demo

Frontend: (add your Vercel URL here)

Backend API: (add your Render URL here)

✨ Features

🔐 User Authentication

Signup & Login functionality

Multiple users supported

📝 Post Creation

Create text-based posts

Optional image URL support

❤️ Engagement

Like posts

Comment on posts

Real-time count updates for likes & comments

📰 Feed

Latest posts appear first

Clean card-based feed layout

Pagination supported from backend

🎨 UI / UX

Modern, soothing gradient background

Elevated post cards with rounded corners

Balanced design — not minimal, not overdone

🛠️ Tech Stack
Frontend

React.js

CSS (custom styling)

Fetch API

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📂 Project Structure
mini-social-app/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Feed.js
│   │   │   ├── CreatePost.js
│   │   │   └── Auth.js
│   │   ├── App.js
│   │   └── App.css
│
└── README.md

⚙️ Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

🧪 API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
POST	/api/posts	Create a post
GET	/api/posts	Get posts (paginated)
POST	/api/posts/:id/like	Like a post
POST	/api/posts/:id/comment	Comment on a post
📸 Screenshots
Social Feed & Post Creation

(see screenshots above)

Post creation with image support

Like & comment interaction

Clean and readable feed layout

🧠 Key Learnings

Managing state correctly between frontend & backend

Handling async API issues and debugging production bugs

MongoDB authentication & Atlas networking

Deploying full-stack apps under deadline pressure

📌 Future Improvements

JWT-based protected routes

User profile pages

Edit / delete posts

Infinite scrolling

Better error handling UI

👤 Author

Manan Grover
