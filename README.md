**Library Management System Backend**
**Overview **
This project is the backend for a Library Management System built using Node.js, Express, and PostgreSQL. It provides a RESTful API for managing books, members, and borrow history. The system supports two user roles: LIBRARIAN and MEMBER.

Librarians can manage books and members.
Members can borrow and return books and view their borrowing history.


**KEY FEATURES**
JWT Authentication: Secure login for both Librarian and Member roles.
Role-based Access: Different permissions for Librarians and Members.
Book Management: Add, update, delete, and view books.
Member Management: Add, update, delete, and view members (Librarian role only).
Borrowing System: Members can borrow and return books.
Database: PostgreSQL for storing data securely.
Environment Variables: Manage sensitive configurations using .env.

**TECHNOLOGY USED** 
Node.js: JavaScript runtime for building server-side applications.
Express: A fast and minimalist web framework for Node.js.
PostgreSQL: A robust and scalable relational database system.
Sequelize: ORM for Node.js, providing easy interaction with PostgreSQL.
JWT: For secure authentication.
dotenv: For environment variable management.


**API Documentation Endpoints**

**BACKEND ENDPOINT FOR YOUR POSTMAN TESTING => "https://librarymanagement-1-qzbs.onrender.com"**

**BACKEND ENDPOINT =>  " https://librarymanagement-iit-bombay.netlify.app/ "**

**Authentication**
Register a New User (Librarian or Member)
POST /api/v1/auth/register

Login User
POST /api/v1/auth/login

========================
**Librarian**
Add a Book
POST /api/v1/librarian/book

Update a Book
PUT /api/v1/librarian/book/:bookId

Get a Book by ID
GET /api/v1/librarian/book/:bookId

Delete a Book
DELETE /api/v1/librarian/book/:bookId

Get All Books
GET /api/v1/librarian/books

Add a Member
POST /api/v1/librarian/member

Update a Member
PUT /api/v1/librarian/member/:memberId

Delete a Member
DELETE /api/v1/librarian/member/:memberId

Get All Members
GET /api/v1/librarian/members

Get Member Borrowing History
GET /api/v1/librarian/members/history/:memberId

===========================
**Member**
View Available Books
GET /api/v1/member/books

Borrow a Book
POST /api/v1/member/borrow/:bookId

Return a Book
POST /api/v1/member/return/:bookId

View Borrowing History
GET /api/v1/member/history

Delete Own Account
DELETE /api/v1/member/account