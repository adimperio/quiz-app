import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppV1 from './v1/App';
import AppV2 from './v2/App';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', gap: '20px' }}>
      <h1>Choose a Quiz</h1>
      <Link to="/quiz-v1" style={{ padding: '10px 20px', background: '#1a2b3c', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Home Health Quiz
      </Link>
      <Link to="/quiz-v2" style={{ padding: '10px 20px', background: '#ac4837', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Women's InnerFitness Quiz
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-v1" element={<AppV1 />} />
        <Route path="/quiz-v2" element={<AppV2 />} />
      </Routes>
    </Router>
  );
}

export default App;
