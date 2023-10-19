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
// const defaultCalendarData = [
//     // 1ページ目のデータ
//     [
//     [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { type: 'wish', content: 'wish' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     [{ type: 'wish', content: 'wish' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { type: 'wish', content: 'wish' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { type: 'wish', content: 'wish' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { type: 'wish', content: 'wish'}],
//     [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//     ],
//     // 2ページ目のデータ
//     [
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         ],
//     // 3ページ目のデータ
//     [
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['2any'], content: '2any' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
//         ],
//     ];


const defaultCalendarData = [
    // 1ページ目のデータ
    {
        date: "2023-10-18",
        events: 
            [{type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-19",
        events:[{ type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: '2any', content: '2any' }
        ]
    },{
        date: "2023-10-20",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'wish', content: 'wish' }, { type: '2any', content: '2any' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-21",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-22",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-23",
        events: 
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },{
        date: "2023-10-24",
        events: 
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },

    {
        date: "2023-10-25",
        events: 
            [{type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-26",
        events:
            [{ type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: '2any', content: '2any' }
        ]
    },{
        date: "2023-10-27",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'wish', content: 'wish' }, { type: '2any', content: '2any' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-28",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-29",
        events: 
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }
        ]
    },{
        date: "2023-10-30",
        events: 
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },{
        date: "2023-10-31",
        events: 
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },
    ]

    const ScheduleCalendar = () => {
        const [calendarData, setCalendarData] = useState([]);
        const containerRef = useRef(null);
    
        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch('バックエンドのURL');
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setCalendarData(data);
                } catch (error) {
                    console.error("データの取得中にエラーが発生しました:", error);
                    setCalendarData(defaultCalendarData);
                }
            }
            fetchData();
        }, []);
    // イベントをカレンダーセル情報に変換するヘルパー関数
    const eventToCells = (event) => {
    const content = event.content || event.type;
    switch (event.type) {
        case '講義':
            return { color: CONTENT_COLOR_MAP['講義'], content: content };
        case 'wish':
            return { color: CONTENT_COLOR_MAP['wish'], content: content };
        case '2any':
            return { color: CONTENT_COLOR_MAP['2any'], content: content };
        case 'NULL':
        default:
            return { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' };
    }
};

const groupWeeks = (data) => {
    const weeks = [];
    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }
    return weeks;
};

return (
    <div ref={containerRef} style={{ height: '80vh', overflowY: 'auto', borderRadius: 20 }}>
        {Array.isArray(calendarData) && groupWeeks(calendarData).map((week, index) => {
            const weekCells = week.map(weekData => weekData.events.map(event => eventToCells(event)));
            return (
                <div key={index} style={{ paddingBottom: '20vh' }}>
                    <PageWeek data={weekCells} />
                </div>
            );
        })}
    </div>
);
}

export default ScheduleCalendar;
