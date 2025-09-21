import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SDashboard from "./Pages/Student/StudentDashboard/SDashboard.jsx";
import ChatPage from "./Pages/Student/ChatPage/ChatPage.jsx";
import CourseCard from "./Pages/Student/Course_Details/CourseCard.jsx";
import QuizPage from "./Pages/Student/Quiz_Page/QuizPage.jsx";
import RegisterPage from "./Pages/Student/RegisterPage/RegisterPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import AdminDashBoard from "./Pages/Admin/AdminDashboard/AdminDashboard.jsx";
import Usermanagement from "./Pages/Admin/UserManagement/UserManagement.jsx";
import CourseCreation from "./Pages/Instructors/CourseCreation/CourseCreation.jsx";
import AddUnits from "./Pages/Instructors/CourseCreation/AddUnits.jsx";
import CourseManagement from "./Pages/Instructors/CourseManagement/CourseManagement.jsx"
import InstructorProfile from "./Pages/Instructors/InstructorProfile/InstructorProfile.jsx"
import EditProfile from "./Pages/Instructors/InstructorProfile/EditProfile.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/SDashboard" replace />} />
          <Route path="/SDashboard" element={<SDashboard />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/CourseCard" element={<CourseCard />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          <Route path="/Usermanagement" element={<Usermanagement />} />
          <Route path="/CourseCreation" element={<CourseCreation />} />
          <Route path="/AddUnits" element={<AddUnits />} />
          <Route path='/CourseManagement' element={<CourseManagement />} />
          <Route path='/InstructorProfile' element={<InstructorProfile />} />
          <Route path='/EditProfile' element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
