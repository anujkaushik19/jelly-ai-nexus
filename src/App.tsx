<<<<<<< Updated upstream
import { useEffect } from 'react';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
=======
<<<<<<< Updated upstream
=======
import { useEffect } from 'react';
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
>>>>>>> Stashed changes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes

import Home from './pages/Home';
import DashboardLayout from './components/DashboardLayout';
import EntitySets from './pages/EntitySets';
import NewTraining from './pages/NewTraining';
import TrainingResults from './pages/TrainingResults';
import DocumentView from './pages/DocumentView';
import PastTrainings from './pages/PastTrainings';
import NotFound from './pages/NotFound';
import Trained from './pages/Trained';
import Register from './pages/Register';
import Login from './pages/Login';

const queryClient = new QueryClient();

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
<<<<<<< Updated upstream
    if (window.location.pathname === '/') {
      navigate(token ? '/dashboard' : '/register');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<div />} /> {/* placeholder */}
=======
    const publicRoutes = ['/register', '/login'];
    if (!token && !publicRoutes.includes(window.location.pathname)) {
      navigate('/register');
    }
  }, [navigate]);

  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/register" />} />
>>>>>>> Stashed changes
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<EntitySets />} />
        <Route path="entity-sets" element={<EntitySets />} />
        <Route path="new-training" element={<NewTraining />} />
        <Route path="training-results" element={<TrainingResults />} />
        <Route path="past-trainings" element={<PastTrainings />} />
        <Route path="document/:id" element={<DocumentView />} />
        <Route path="training/:id" element={<TrainingResults />} />
        <Route path="trained" element={<Trained />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
