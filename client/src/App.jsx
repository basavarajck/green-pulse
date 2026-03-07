// // src/App.jsx (Updated - ADD EventsPage import and route)
// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import EventsPage from './pages/EventsPage'; 
// import './App.css';
// import HeroAnimation from './HeroAnimation';
// import LoginSuccess from './components/LoginSuccess';
// import AnnouncementsPage from './pages/AnnouncementsPage'; 
// import ProjectsPage from './pages/ProjectsPage';  
// import BlogsPage from './pages/BlogsPage';  
// import BlogDetailPage from './pages/BlogDetailPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import ResearchPage from './pages/ResearchPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login/success" element={<LoginSuccess />} />
//         <Route 
//           path="/events" 
//           element={
//             <ProtectedRoute>
//               <EventsPage />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/announcements" 
//           element={
//             <ProtectedRoute>
//               <AnnouncementsPage />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/projects" 
//           element={
//             <ProtectedRoute>
//               <ProjectsPage />
//             </ProtectedRoute>
//           } 
//         />
//         <Route path="/blogs" element={<BlogsPage />} />  
//         <Route path="/blogs/:id" element={<BlogDetailPage />} />
//         <Route path="/research" element={<ResearchPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// src/App.jsx
// src/App.jsx - Optimized with lazy loading for better performance
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

// Lazy load route components for code splitting
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const LoginSuccess = lazy(() => import('./components/LoginSuccess'));
const AnnouncementsPage = lazy(() => import('./pages/AnnouncementsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: '#4ade80'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Home page - not lazy loaded for instant access */}
          <Route path="/" element={<Home />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          
          {/* Protected routes */}
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Public routes */}
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;