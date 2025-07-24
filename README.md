# 📚 Book Review Platform
A full-stack web application where users can discover books, write reviews, and share their reading experiences with the community.

## 🌟 Features
**📖 Book Management**

- Browse Books: View a paginated list of all books with search and filter capabilities. Filter by genre/author and sort by rating, date, title, or author
  <img width="1364" height="605" alt="UI" src="https://github.com/user-attachments/assets/a755ddc2-c85d-414b-8fe7-8c789eb915e5" />

- Add Books: Authenticated users can add new books to the platform
  <img width="1360" height="600" alt="addbook" src="https://github.com/user-attachments/assets/29b3b588-8c3e-4ed3-9fdd-ba680fd4a85f" />

- Book Details: Comprehensive book information with reviews and ratings
  <img width="1362" height="601" alt="bookdetails" src="https://github.com/user-attachments/assets/1603e00f-c4a3-4437-be79-02afd9617936" />

**⭐ Review System**

- Write Reviews: Logged-in users can write detailed reviews with 1-5 star ratings
  <img width="1356" height="599" alt="writereview" src="https://github.com/user-attachments/assets/8ed636e2-b6d1-4328-8b22-c2fcc2ee7246" />

- View Reviews: See all reviews for any book with reviewer information, Average Ratings and One Review Rule(Users can only review each book once)
  <img width="1362" height="602" alt="reviews" src="https://github.com/user-attachments/assets/e16821ef-c20d-49e8-9bcd-a7e17f9ee3a6" />

**🔐 Authentication**

- User Registration: Create new accounts with email verification
  <img width="1364" height="606" alt="reg" src="https://github.com/user-attachments/assets/1f5c9609-b755-47d5-8b47-708ec2ec08db" />

- Secure Login: JWT-based authentication system
  <img width="1366" height="601" alt="log" src="https://github.com/user-attachments/assets/c35f90e0-4837-4b60-b8b3-b3c94176b4a1" />

**🎨 User Interface**

- Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

- Interactive Star Ratings: Visual star display for ratings and reviews

- Modern UI: Clean, intuitive interface with smooth navigation

- Real-time Updates: Dynamic content updates without page refreshes
  <img width="1364" height="605" alt="UI" src="https://github.com/user-attachments/assets/b6eaeead-f037-4758-ae4f-983d42a9ad1a" />

## 🛠️ Tech Stack
**Backend**

- Node.js - Runtime environment

- Express.js - Web framework

- MongoDB - NoSQL database

- Mongoose - Object modeling for MongoDB

- JWT - JSON Web Tokens for authentication

- bcryptjs - Password hashing

- express-validator - Input validation

**Frontend**

- React - Frontend library

- React Router - Client-side routing

- Axios - HTTP client for API calls

- CSS3 - Modern styling with responsive design

- React Hooks - State management

## 🚀 Quick Start
**Prerequisites**

Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas)

npm or yarn package manager


## Installation

1. **Clone the repository**
    ```
      git clone https://github.com/yourusername/book-review-platform.git
      cd book-review-platform

2. **Backend Setup**
    ```
      cd backend
      npm install

3. **Frontend Setup**
    ```
      cd ../frontend
      npm install

4. **Environment Configuration**
   
    Create a .env file in the backend directory:
    ```
      MONGODB_URI=mongodb://localhost:27017/bookreview
      JWT_SECRET=your_super_secret_jwt_key_here
      PORT=5000

6. **Start the Application**
   
   - Terminal 1 (Backend):
    ```
      cd backend
      npm run dev


    - Terminal 2 (Frontend):
     ```
       cd frontend
       npm start

8. **Access the Application**

    Frontend: http://localhost:3000

    Backend API: http://localhost:5000


## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
  
