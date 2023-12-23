import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import Profile from "../../Pages/Profile/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile/EditProfile";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import DashBoard from "../../Layout/DashBoard";
import AcademicInfo from "../../DashBoard/AcademicInfo/AcademicInfo";
import AllTeacher from "../../DashBoard/AllTeacher/AllTeacher";
import AllStudents from "../../DashBoard/AllStudents/AllStudents";
import AddTeacher from "../../DashBoard/AddTeacher/AddTeacher";
import Apply from "../../Pages/Apply/Apply";
import TotalApply from "../../DashBoard/TotalApply/TotalApply";
import ApplyDetails from "../../DashBoard/TotalApply/ApplyDetails";
import Application from "../../Pages/Profile/Application/Application";
import TeacherDetails from "../../DashBoard/AllTeacher/TeacherDetails";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import Users from "../../DashBoard/Users/Users";

export const router = createBrowserRouter([
    {
        path : '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'profile',
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
            },
            {
                path: 'edit-profile',
                element: <PrivateRoutes><EditProfile></EditProfile></PrivateRoutes>
            },
            {
                path: 'apply-admission',
                element: <PrivateRoutes><Apply></Apply></PrivateRoutes>
            },
            {
                path: 'application',
                element: <PrivateRoutes><Application></Application></PrivateRoutes>
            },
        ]
    },
    {
        path: '/dashboard',
        element : <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        children : [
            {
                path: '/dashboard',
                element: <AcademicInfo></AcademicInfo>
            },
            {
                path: '/dashboard/academic-info',
                element: <AcademicInfo></AcademicInfo>
            },
            {
                path: '/dashboard/teacher-list',
                element: <AdminRoutes><AllTeacher></AllTeacher></AdminRoutes>
            },
            {
                path: '/dashboard/student-list',
                element: <AdminRoutes><AllStudents></AllStudents></AdminRoutes>
            },
            {
                path: '/dashboard/users-list',
                element: <AdminRoutes><Users></Users></AdminRoutes>
            },
            {
                path: '/dashboard/add-teacher',
                element: <AdminRoutes><AddTeacher></AddTeacher></AdminRoutes>
            },
            {
                path: '/dashboard/total-apply',
                element: <AdminRoutes><TotalApply></TotalApply></AdminRoutes>
            },
            {
                path: '/dashboard/apply-details/:id',
                loader : ({params})=> fetch(`https://school-server-pink.vercel.app/apply-details/${params.id}`),
                element: <AdminRoutes><ApplyDetails></ApplyDetails></AdminRoutes>
            },
            {
                path: '/dashboard/teacher-details/:id',
                loader : ({params})=> fetch(`https://school-server-pink.vercel.app/teacher/${params.id}`),
                element: <AdminRoutes><TeacherDetails></TeacherDetails></AdminRoutes>
            },
        ]
    }
])