// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScheduleCalendar from './components/ScheduleCalendar.jsx';
import Home from './components/Home.jsx'
import GlobalMenu from './components/GlobalMenu';

function App() {
  return (
    <Router> {/* <Router> コンポーネントを追加 */}
      <div className="App">
        <header>
          <h1>4me 2any</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<ScheduleCalendar />} />
            {/* 他のルートを追加 */}
          </Routes>
        </main>
        <footer>
          <GlobalMenu /> {/* グローバルメニューを画面の下に配置 */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
