// src/App.jsx (Updated - ADD EventsPage import and route)
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import EventsPage from './pages/EventsPage'; 
import './App.css';
import HeroAnimation from './HeroAnimation';
import LoginSuccess from './components/LoginSuccess';
import AnnouncementsPage from './pages/AnnouncementsPage'; 
import ProjectsPage from './pages/ProjectsPage';  
import BlogsPage from './pages/BlogsPage';  
import BlogDetailPage from './pages/BlogDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import ResearchPage from './pages/ResearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/success" element={<LoginSuccess />} />
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
        <Route path="/blogs" element={<BlogsPage />} />  
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
