![Spotify2](https://github.com/user-attachments/assets/594eb562-aeb0-494a-bdfb-ff23225b311f)

## Dashboard

![Spotify1](https://github.com/user-attachments/assets/c38a9068-f524-4cb4-867e-4ca9f522f83b)



This project is a clone of the popular music streaming service, Spotify. It allows users to listen to their favorite music, create playlists, and explore new music. It is built using Express and React, and provides a basic version of Spotify's key features.

## Features

**Tech Stack**: Node.js, MongoDB, Express, Tailwind CSS   
**Authentication**: Clerk  
**Media Uploads**: Cloudinary 


- User login with a Google Account  
- Listen to music, play next and previous songs
- Update the volume with a slider 
- Admin dashboard to create albums and songs 
- Real-time Chat App integrated into Spotify
- Online/Offline status 
- See what other users are listening to in real-time 


## Installation & Setup

1. Clone the repository:
```bash
  git clone https://github.com/your-username/your-repo-name.git
  cd your-repo-name
```

2. Install dependencies:
```bash
  npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary credentials (MongoDB URI, Cloudinary keys, etc.).

4. Start the development server:
```bash
  npm run dev
```

## Project Structure
```
/Clone---Spotify
│── backend  # Node.js & Express backend
│── frontend # React.js frontend
│── .env     # Environment variables
│── package.json
│── README.md
```
## Setup .env file in backend folder
```
PORT=...
MONGODB_URI=...
ADMIN_EMAIL=...
NODE_ENV=...

CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...


CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

## Setup .env file in frontend folder
```
VITE_CLERK_PUBLISHABLE_KEY=...
```
## Deployment
This application is fully deployable. Ensure that your environment variables are correctly configured for production.

It is live on at [https://full-e-commerce-jrg5.onrender.com](https://clone-spotify-6bux.onrender.com/)

Note: The website will spin down with inactivity, which can delay requests by 50 seconds or more.
