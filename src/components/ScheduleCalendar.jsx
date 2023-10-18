import React, { useState, useEffect, useRef } from 'react';
import Flicking from "@egjs/react-flicking";
import FrameGrid from "@egjs/react-grid"
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import PageWeek from './PageWeek';
// import './ScheduleCalendar.css'

const CONTENT_COLOR_MAP = {
    '講義': '#E65032',
    '2any': '#2B5B75',
    'wish': '#5C8195',
    'NULL': '#A8A7A7'
  };

const defaultCalendarData = [
    // 1ページ目のデータ
    [
    [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['wish'], content: 'wish' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    [{ color: CONTENT_COLOR_MAP['wish'], content: 'wish' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['wish'], content: 'wish' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['wish'], content: 'wish' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['wish'], content: 'wish'}],
    [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
    ],
    // 2ページ目のデータ
    [
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        ],
    // 3ページ目のデータ
    [
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        ],
    ];

const ScheduleCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(0);  // 現在の週を追跡するステート
    const containerRef = useRef(null);

    // バックエンドからデータを取得する
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('バックエンドのURL');  // バックエンドのURLを指定してください
                const data = await response.json();
                setCalendarData(data);
            } catch (error) {
                console.error("データの取得中にエラーが発生しました:", error);
                setCalendarData(defaultCalendarData);  // エラーが発生した場合、デフォルトのデータを
            }
        }
        fetchData();
    }, []);
    
    return (
        <div style={{  height: '80vh', borderRadius: 20 }}>  {/* スクロール可能なスタイルを適用 */}
            {calendarData.map((weekData, index) => (  // 各週のデータをループで表示
                <div key={index} style={{paddingBottom: '20vh'}}>
                    <PageWeek data={weekData} />
                </div>
            ))}
        </div>
    );
}

export default ScheduleCalendar;




