import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './pages/LoadingScreen';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
