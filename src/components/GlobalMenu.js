// src/components/GlobalMenu.js

import React, { useEffect, useState }  from 'react';
import { AiFillHome, AiFillSchedule, AiFillSetting } from "react-icons/ai"
import ScheduleCalendar from './ScheduleCalendar'
import './GlobalMenu.css';

const GlobalMenu = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
    
        const handle = (mm) => {
          setIsMobile(mm.matches);
        };
    
        handle(mediaQuery);
        mediaQuery.addListener(handle);
    
        return () => {
          mediaQuery.removeListener(handle);
        };
      }, []);
    const handleTabClick = (tab) => {
        setIsSidebarOpen(false);
        setActiveTab(tab);
      };
  return (
    <div className="global-menu">
      <ul>
        <li>
          <a href="/" className="menu-item">
            <AiFillHome className="menu-icon" />
            <span onClick={() => handleTabClick('ScheduleCalendar')}>
                Home
            </span>
          </a>
        </li>
        <li>
          <a href="/schedule" className="menu-item">
            <AiFillSchedule className='menu-icon' />
            <span onClick={() => handleTabClick('ScheduleCalendar')}>
                Schedule
            </span>
          </a>
        </li>
        <li>
          <a href="/about" className="menu-item">
          <AiFillSetting className='menu-icon' />
          <span>Setting</span>
          </a>
        </li>
        {/* 他のメニューアイテムも同様に追加 */}
      </ul>
      {activeTab === 'ScheduleCalendar' && <ScheduleCalendar className="overlay" />}
    </div>
  );
};

export default GlobalMenu;
