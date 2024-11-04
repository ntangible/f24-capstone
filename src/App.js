import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import { FirestoreProvider } from "./contexts/FirestoreContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import AddPurchase from "./pages/AddPurchase";
import AddGoal from "./pages/AddGoal";
import AddPaycheck from "./pages/AddPaycheck";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {" "}
                  <UserProfile />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase"
              element={
                <ProtectedRoute>
                  {" "}
                  <AddPurchase />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  {" "}
                  <AddGoal />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  {" "}
                  <AddPaycheck />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
