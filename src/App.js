import './App.css';
import Navbar from './components/Header';
import NotFound from './pages/NotFound';
import TournamentPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import ToastManager from './components/ToastManager';
import WheatherPage from './pages/WheatherPage';
import SettingsPage from './pages/SettingsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <ToastManager />
      <Navbar />
      <div>
        <Routes>
          <Route path="/tournaments" exact element={<TournamentPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          <Route path="/wheather" element={<WheatherPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
