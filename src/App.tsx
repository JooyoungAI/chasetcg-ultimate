import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Guess from './pages/Guess';
import Rate from './pages/Rate';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/guess" element={<Guess />} />
            <Route path="/rate" element={<Rate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
