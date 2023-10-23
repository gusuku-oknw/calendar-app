import React, { useState, useEffect, useRef } from 'react';
import Flicking from "@egjs/react-flicking";
import FrameGrid from "@egjs/react-grid"
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import PageWeek from './PageWeek';
// import './ScheduleCalendar.css'

const CONTENT_COLOR_MAP = {
    '講義': 'rgba(230,80,50,0.95)',
    '2any': '#2B5B75',
    'wish': '#5C8195',
    'NULL': '#d7d7d7'
  };

const defaultCalendarData = [
    // 1ページ目のデータ
    {
        day: "2023-10-18",
        events:
            [{type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-19",
        events:[{ type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: '2any', content: '2any' }
        ]
    },{
        day: "2023-10-20",
        events:
            [{ type: '講義', content: '講義' }, { type: 'wish', content: 'wish' }, { type: '2any', content: '2any' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-21",
        events:
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-22",
        events:
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-23",
        events:
            [{ type: 'wish', content: 'wish' }, { type: 'wish', content: 'wish' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },{
        day: "2023-10-24",
        events:
            [{ type: 'wish', content: 'wish' }, { type: 'wish', content: 'wish' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },

    {
        day: "2023-10-25",
        events:
            [{type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-26",
        events:
            [{ type: 'wish', content: 'wish' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '2any', content: '2any' }, { type: '2any', content: '2any' }
        ]
    },{
        day: "2023-10-27",
        events:
            [{ type: '講義', content: '講義' }, { type: 'wish', content: 'wish' }, { type: '2any', content: '2any' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-28",
        events:
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-29",
        events:
            [{ type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: '講義', content: '講義' }
        ]
    },{
        day: "2023-10-30",
        events:
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },{
        day: "2023-10-31",
        events:
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
        ]
    },{
        day: "2023-11-1",
        events:
            [{ type: '講義', content: '講義' }, { type: '講義', content: '講義' }, { type: 'NULL' }, { type: 'NULL' }, { type: 'NULL' }
            ]
    },{
        day: "2023-11-2",
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
                    const response = await fetch('http://127.0.0.1:5000/get_calendar_data');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data);

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
                return { content: content, color: CONTENT_COLOR_MAP['講義'], styles: 'low' };
            case 'wish':
                return { content: content, color: CONTENT_COLOR_MAP['wish'], styles: 'middle' };
            case '2any':
                return { content: content, color: CONTENT_COLOR_MAP['2any'], styles: 'high'};
            case 'NULL':
            default:
                return { content: 'NULL', color: CONTENT_COLOR_MAP['NULL'], styles: ''};
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
        <div ref={containerRef} style={{ height: '75vh', overflowY: 'auto', borderRadius: 20 }}>
            {Array.isArray(calendarData) && groupWeeks(calendarData).map((week, index) => {

                // Extract events for the week
                const weekCells = week.map(weekData =>
                    (weekData.events || []).map(event => eventToCells(event))
                );
                // console.log('Inspecting weekData:', weekCells, 'Is Array:');

                // Extract weekdays for the week
                const weekDays = week.map(weekData => weekData.day);
                // console.log('Inspecting weekData:', weekDays, 'Is Array:');

                return (
                    <div key={index} style={{ paddingBottom: '20vh' }}>
                        <PageWeek data={weekCells} day={weekDays} />
                    </div>
                );
            })}
        </div>
    );
}

export default ScheduleCalendar;
