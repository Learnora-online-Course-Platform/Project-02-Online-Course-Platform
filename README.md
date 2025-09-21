# 🎓 Online Course Platform

An online learning management system (LMS) built with the **MERN stack** (MySQL, Express.js, React.js, Node.js) that allows students to enroll in courses, access course materials, complete quizzes/assignments, and track their progress. Instructors can manage courses, upload materials, and grade submissions.

---

## 🚀 Features

### 👩‍🎓 Student
- Register/login with authentication.
- Enroll in available courses.
- Access course materials (videos, PDFs, quizzes).
- Submit assignments and receive grades/feedback.
- Track progress with completion percentage.
- Participate in forums and send messages.

### 👨‍🏫 Instructor
- Create and manage courses.
- Upload course materials (video, PDF, quiz).
- Create assignments and quizzes.
- View and grade student submissions.
- Manage student progress.

### ⚙️ Admin
- Manage users (students, instructors).
- Monitor payments and platform usage.
- Moderate forum discussions.

### 💳 Payments
- Course payments with tracking of status (pending, completed, failed).

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- React Router
- Flowbite-React / Bootstrap
- Axios

**Backend**
- Node.js
- Express.js
- Sequelize ORM
- MySQL (Database)

**Other Tools**
- Nodemon (for development server)
- dotenv (environment variables)
- Sequelize CLI (migrations & models)

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

