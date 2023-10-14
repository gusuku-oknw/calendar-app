// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScheduleCalendar from './components/ScheduleCalendar';
import Home from './components/DemoComponent'
import GlobalMenu from './components/GlobalMenu';

function App() {
  return (
    <Router> {/* <Router> コンポーネントを追加 */}
      <div className="App">
        <header>
          <h1>アプリケーションのタイトル</h1>
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
