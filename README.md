# 📚 Book Review Platform
A full-stack web application where users can discover books, write reviews, and share their reading experiences with the community.

## 🌟 Features
**📖 Book Management**

- Browse Books: View a paginated list of all books with search and filter capabilities. Filter by genre/author and sort by rating, date, title, or author
  <img width="1364" height="605" alt="UI" src="https://github.com/user-attachments/assets/382bfe13-e137-41c6-a9f0-8ff01e046864" />

- Add Books: Authenticated users can add new books to the platform
  <img width="1360" height="600" alt="addbook" src="https://github.com/user-attachments/assets/97997964-7cf1-4640-a44e-5369e4a77a25" />

- Book Details: Comprehensive book information with reviews and ratings
  <img width="1362" height="601" alt="bookdetails" src="https://github.com/user-attachments/assets/1d35709a-f9d6-460a-b301-856cfec9419e" />

**⭐ Review System**

- Write Reviews: Logged-in users can write detailed reviews with 1-5 star ratings
  <img width="1356" height="599" alt="writereview" src="https://github.com/user-attachments/assets/25935860-ff86-4857-beef-8a70948a1caf" />

- View Reviews: See all reviews for any book with reviewer information, Average Ratings and One Review Rule(Users can only review each book once)
  <img width="1362" height="602" alt="reviews" src="https://github.com/user-attachments/assets/2f2f82b3-a7b3-443b-9fa3-c84fbb3f25b6" />

**🔐 Authentication**

- User Registration: Create new accounts with email verification
  <img width="1364" height="606" alt="reg" src="https://github.com/user-attachments/assets/b765535a-9c1d-4a35-9138-388ca3549828" />

- Secure Login: JWT-based authentication system
  <img width="1366" height="601" alt="log" src="https://github.com/user-attachments/assets/d0c04ef3-32bc-43f5-a86b-0f6f43599523" />

**🎨 User Interface**

- Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

- Interactive Star Ratings: Visual star display for ratings and reviews

- Modern UI: Clean, intuitive interface with smooth navigation

- Real-time Updates: Dynamic content updates without page refreshes
  <img width="1364" height="605" alt="UI" src="https://github.com/user-attachments/assets/e4d1c5b4-033d-4958-beb9-c4983193994a" />

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
  
