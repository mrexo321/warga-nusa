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
import HomeProgram from "./pages/home/HomeProgram";
import HomeNews from "./pages/home/HomeNews";
import CourseDetailMaterials from "./views/admin/course/CourseDetailMaterials";
import HomeDetailCourse from "./views/home/course/HomeDetailCourse";
import CourseFormPage from "./views/admin/course/CourseFormPage";
import PreviewCourse from "./views/admin/course/PreviewCourse";
import AddNews from "./views/admin/news/AddNews";
import HomeAbout from "./views/home/about/HomeAbout";
import ClientAndPorto from "./views/home/clientporto/ClientAndPorto";
import ContactUs from "./views/home/contact/ContactUs";
import AddShift from "./views/admin/shift/AssignShift";
import AddCourse from "./views/admin/course/AddCourse";
import HomeNewsPreview from "./views/home/news/HomeNewsPreview";
import AssignShift from "./views/admin/shift/AssignShift";
import ProductDetail from "./components/ProductDetail";
import TaskReport from "./pages/admin/TaskReport";
import Patrol from "./pages/user/Patrol";
import DetailPatrol from "./views/admin/patrol/DetailPatrol";
import UserPatrol from "./views/user/patrol/UserPatrol";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeprogram" element={<HomeProgram />} />
      <Route path="/homeabout" element={<HomeAbout />} />
      <Route path="/homenews" element={<HomeNews />} />
      <Route path="/client-porto" element={<ClientAndPorto />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/homeprogram/:id" element={<HomeDetailCourse />} />
      <Route path="/news/:id" element={<HomeNewsPreview />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route element={<ProtectedRoutes allowedRoles={["admin", "user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patrol" element={<Patrol />} />
        <Route path="/patrol/:id/detail" element={<DetailPatrol />} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/users" element={<ManagementUser />} />
        <Route path="/shift" element={<ManagementShift />} />
        <Route path="/shift-assignment" element={<AssignShift />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/courses" element={<ManagementCourse />} />
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/news" element={<ManagementNews />} />
        <Route path="/news/add" element={<AddNews />} />
        <Route path="/gallery" element={<ManagementGallery />} />
        <Route path="/courses/:id" element={<CourseDetailMaterials />} />
        <Route path="/courses/preview/:id" element={<PreviewCourse />} />
        <Route path="/courses/edit/:id" element={<CourseFormPage />} />
        <Route path="/task-report" element={<TaskReport />} />
      </Route>

      <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shift-kehadiran" element={<ShiftKehadiran />} />
        <Route path="/course-satpam" element={<SecurityCourses />} />
        <Route path="/course-satpam/detail/:id" element={<DetailCourse />} />
        <Route path="/user-patrol" element={<UserPatrol />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
