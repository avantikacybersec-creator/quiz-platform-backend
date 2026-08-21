import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Categories from "./pages/admin/Categories";
import Quizzes from "./pages/admin/Quizzes";
import Questions from "./pages/admin/Questions";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import StudentQuiz from "./pages/student/StudentQuiz";
import StudentAttemptResult from "./pages/student/StudentAttemptResult";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================== DEFAULT ==================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* ==================== AUTH ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==================== ADMIN ==================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Quizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Questions />
            </ProtectedRoute>
          }
        />

        {/* ==================== STUDENT DASHBOARD ==================== */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==================== STUDENT QUIZ LIST ==================== */}

        <Route
          path="/student/quizzes"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentQuizzes />
            </ProtectedRoute>
          }
        />

        {/* ==================== TAKE QUIZ ==================== */}

        <Route
          path="/student/quizzes/:id"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentQuiz />
            </ProtectedRoute>
          }
        />

        {/* ==================== QUIZ RESULT ==================== */}

        <Route
          path="/student/attempts/:id"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentAttemptResult />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;