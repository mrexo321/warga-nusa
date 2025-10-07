import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
// import Dashboard from "./dashboard/Dashboard";
import NotFound from "./components/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import ShiftKehadiran from "./pages/user/ShiftKehadiran";
import SecurityCourses from "./pages/user/SecurityCourses";
import DetailCourse from "./views/user/course/DetailCourse";
import ManagementUser from "./pages/admin/ManagementUser";
import ManagementShift from "./pages/admin/ManagementShift";
import Attendance from "./pages/admin/Attendance";
import ManagementCourse from "./pages/admin/ManagementCourse";
import ManagementGallery from "./pages/admin/ManagementGallery";
import ManagementNews from "./pages/admin/ManagementNews";
import HomeProgram from "./pages/home/Program";
import HomeNews from "./pages/home/HomeNews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeprogram" element={<HomeProgram />} />
      <Route path="/homenews" element={<HomeNews />} />

      <Route element={<ProtectedRoutes allowedRoles={["admin", "user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/users" element={<ManagementUser />} />
        <Route path="/shift" element={<ManagementShift />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/courses" element={<ManagementCourse />} />
        <Route path="/news" element={<ManagementNews />} />
        <Route path="/gallery" element={<ManagementGallery />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shift-kehadiran" element={<ShiftKehadiran />} />
        <Route path="/course-satpam" element={<SecurityCourses />} />
        <Route path="/course-satpam/detail" element={<DetailCourse />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
