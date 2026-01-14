# DSA Sheet Tracker

A web application to track DSA learning progress with login, topics, problems, and progress tracking.

## Features

- User registration & login with JWT authentication
- Password hashing with bcryptjs
- Dashboard with 3 tabs: Profile, Topics, and Progress
- 10 DSA topics with 70+ problems
- Mark problems as Done/Pending with checkboxes
- Progress bars showing completion by difficulty
- YouTube, LeetCode, and article links for each problem
- Dark theme UI with Tailwind CSS
- Progress saved to database and persists across sessions

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT tokens, bcryptjs
- Deployment: AWS EC2 (backend), Vercel (frontend)

---

## Project Structure

```
Assessment/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── App.jsx           # Main app with routing & tabs
│   │   ├── main.jsx          # Entry point
│   │   ├── styles.css        # Tailwind CSS
│   │   ├── components/
│   │   │   ├── Dashboard.jsx       # Profile, Topics, Progress views
│   │   │   ├── LoginPage.jsx       # Authentication form
│   │   │   ├── TopicList.jsx       # Topic display
│   │   │   └── ProblemCard.jsx     # Problem card with actions
│   │   └── services/
│   │       └── api.js        # Axios API client
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Node.js Backend (Express)
│   ├── src/
│   │   ├── index.js          # Express server & MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js       # User schema (with progress tracking)
│   │   │   └── Topic.js      # Topic & Problem schema
│   │   ├── routes/
│   │   │   ├── auth.js       # Register/Login endpoints
│   │   │   └── topics.js     # Topics & toggle endpoints
│   │   └── middleware/
│   │       └── auth.js       # JWT authentication middleware
│   ├── package.json
│   ├── .env                  # Environment variables
│   └── reseed.js             # Database seeding script
│
└── README.md                 # This file
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/Assessment.git
cd Assessment

# Server setup
cd server
npm install

# Create .env file with:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dsa_sheet
JWT_SECRET=your-secret-key

# Start backend
npm run dev

# Frontend setup (new terminal)
cd ../client
npm install
npm run dev

# Open http://localhost:5173 and register/login
```

## API Endpoints

**Auth Routes** (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - Login and get token

**Topics Routes** (`/api/topics`)
- `GET /` - Get all topics with user progress
- `POST /:problemId/toggle` - Mark problem as done/pending

## Security

- Passwords hashed with bcryptjs
- JWT token-based authentication
- CORS enabled
- Environment variables for secrets
- Server-side validation on routes
- MongoDB injection protection via Mongoose

## Database

**User Schema**
- name, email, passwordHash
- progress array with problemId and completed status

**Topic Schema**
- name, chapter
- problems array with title, description, youtubeUrl, practiceUrl, articleUrl, level (Easy/Medium/Tough)

**Sample Data**
- 10 topics (Algorithms, Data Structures, Databases)
- 70+ problems with YouTube, LeetCode, and article links

## Deployment

1. Push to GitHub
   - Create a new repo on GitHub
   - Run `git init`, `git add .`, `git commit -m "Initial commit"`
   - Push using `git remote add origin` and `git push`

2. Deploy backend on AWS EC2
   - Launch EC2 instance (Ubuntu 22.04, t2.micro)
   - SSH in and install Node.js and MongoDB
   - Clone your repo and run `npm install`
   - Create .env with MongoDB URI and JWT_SECRET
   - Start with `npm run dev` or use PM2 for production

3. Deploy frontend on Vercel
   - Connect Vercel to your GitHub repo
   - Set root directory to `./client`
   - Add environment variable `VITE_API_BASE_URL` pointing to EC2 backend
   - Deploy and get your live URL

## Demo Video

2-3 minute video showing:
- Register and login
- Profile page with stats
- Browse topics and problems
- Mark problems as done
- Progress bars updating
- External links working
- Logout and login to show data persistence

## Notes

- Uses MongoDB on EC2 for database
- Completely free with AWS free tier and Vercel free tier
- Can be scaled to handle more users if needed
- PM2 keeps server running on crashes

