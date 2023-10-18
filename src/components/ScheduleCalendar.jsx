import React, { forwardRef, useEffect } from 'react';
import Flicking from "@egjs/react-flicking";
import FrameGrid from "@egjs/react-grid"
import "@egjs/react-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/react-flicking/dist/flicking-inline.css";
import domo from './DemoComponent';
import CalendarPage from './CalendarPage'
// import './ScheduleCalendar.css'

const flicking = new Flicking("#carousel", {
    align: "center",
    circular: true,
    bound: true,
    renderOnlyVisible: true
  });

const CONTENT_COLOR_MAP = {
    '講義': '#E65032',
    'バイト': '#2B5B75',
    'NULL': '#A8A7A7'
  };
  
const reverseMatrix = (matrix) => {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const transposedMatrix = Array.from({ length: columns }, () =>
      Array.from({ length: rows })
    );
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        transposedMatrix[j][i] = matrix[i][j];
      }
    }
  
    return transposedMatrix;
  };
  
const fillCells = (currentCells) => {
    const filledCells = [...currentCells];
    while (filledCells.length < 5) {
      const newRow = Array(5).fill({ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' });
      filledCells.push(newRow);
    }
    filledCells.forEach(row => {
      while (row.length < 5) {
        row.push({ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' });
      }
    });
    return filledCells;
  };
  
  
  

      const defaultCalendarData = [
          // 1ページ目のデータ
          [
          [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          ],
          [
            [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
          ]
          // 2ページ目のデータ
        //   [
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       ],
        //   // 3ページ目のデータ
        //   [
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
        //       ],
          ];

    // バックエンドからデータを取得する関数
    const fetchDataFromBackend = (week) => {
      // バックエンドのAPIエンドポイントを設定
      // const backendApiUrl = `/get_calendar_data?week=${week}`;
    
      // fetch(backendApiUrl)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data && data.cells) {
      //       const filledCellsFromBackend = fillCells(data.cells);
      //       const reversedCells = reverseMatrix(filledCellsFromBackend);
      //       setCells(reversedCells);
      //     } else {
      //       // バックエンドからのデータがない場合、以下の仮のデータを使用する
      //       // 仮のデータを設定
      //       const dummyData = [
      //         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      //         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }],
      //         [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }],
      //         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      //         [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      //       ];
      //       const dummyDataReversed = reverseMatrix(fillCells(dummyData));
      //       setCells([...dummyDataReversed, ...dummyData]);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('バックエンドからのデータ取得エラー:', error);
      //   });
    };
  
    // const handleCellClick = (rowIndex, cellIndex) => {
    //   fetch('/process_cell_info', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ rowIndex, cellIndex }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setSelectedCell({ rowIndex, cellIndex });
    //       setPopupVisible(true);
    //     })
    //     .catch((error) => {
    //       console.error('エラー:', error);
    //     });
    // };
  
    // const handleContentChange = (content) => {
    //   if (selectedCell) {
    //     const handlePageChangecolor = CONTENT_COLOR_MAP[content];
    //     const newCells = cells.map((row, rIndex) => {
    //       return row.map((cell, cIndex) => {
    //         if (rIndex === selectedCell.rowIndex && cIndex === selectedCell.cellIndex) {
    //           return { ...cell, content: content, color: handlePageChangecolor };
    //         }
    //         return cell;
    //       });
    //     });
    //     setCells(newCells);
    //   }
    // };
  
    // const closePopup = () => {
    //   setPopupVisible(false);
    // };
  
    // const handlePageChange = (event) => {
    //   setPage(event.index);
    //   setCells(defaultCalendarData[event.index]); // ページ切り替え時にデータを更新
    //   // fetchDataFromBackend(event.index);
    // };
  
    export default function ScheduleCalendar() {
        return (
            domo
        // <>
        //     <Flicking>
        //     <div className="panel">1</div>
        //     <div className="flicking-panel nested-wide">
        //       <Flicking bounce="0" bound={true} nested={true}>
        //         <div className="panel">2.1</div>
        //         <div className="panel">2.2</div>
        //         <div className="panel">2.3</div>
        //       </Flicking>
        //     </div>
        //     <div className="flicking-panel nested-wide vertical">
        //       <Flicking bounce="0" bound={true} horizontal={false}>
        //         <div className="panel">3.1</div>
        //         <div className="panel">3.2</div>
        //         <div className="panel">3.3</div>
        //       </Flicking>
        //     </div>
        //     <div className="panel">4</div>
        //   </Flicking>
        
        //   </>
          )
    }
    
    const FrameGridComponent = forwardRef(({ data }, ref) => (
        <FrameGrid
            ref={ref}
            gap={5}
            defaultDirection={"end"}
            frame={data}
            rectSize={0}
            useFrameFill={true}
        >
            {data.flat().map((item, index) => (
                <div style={getItemStyle(item)} key={index}>
                    {item}
                </div>
            ))}
        </FrameGrid>
    ));
    
    function getItemStyle(item) {
        return {
            display: "inline-block",
            padding: "10px",
            border: "1px solid black",
            background: item % 2 === 0 ? 'lightgray' : 'white',
        };
    }
    
    // const FrameGridComponentWithRef = React.memo(FrameGridComponent);
    