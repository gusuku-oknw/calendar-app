import React, { useState, useEffect } from 'react';
import Flicking from "@egjs/react-flicking";

import PopupMenu from './PopupMenu'

// カレンダーセルを表示するコンポーネント
const CalendarPage = ({ cells, cellStyle, marginpx, handleCellClick, handleContentChange, popupVisible, closePopup }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '90%', height: '100%', background: '#ffffff', borderRadius: 30, overflow: 'hidden', border: '1px white solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 0, marginBottom: 0 }}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  ...cellStyle,
                  marginLeft: cellIndex === 0 ? 0 : marginpx,
                  background: cell.color,
                }}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell.content}
              </div>
            ))}
          </div>
        ))}
        {popupVisible && <PopupMenu onClose={closePopup} onContentChange={handleContentChange} />}
      </div>
      <div style={{ height: '700px', background: '#000000' }}></div>
    </div>
  );
};

const Calendar = () => {
    // カレンダーセルの状態を管理するステート
    const [page, setPage] = useState(0);
    const [cells, setCells] = useState(initialCells);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);
    
  const initialCells = [
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
    [{ color: '#A8A7A7', content: 'NULL' }, { color: '#53B09A', content: 'バイト' }],
    [{ color: '#A8A7A7', content: 'NULL' }, { color: '#53B09A', content: 'バイト' }],
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
  ];

  // 行列の反転
  const reverseMatrix = (matrix) => {
    const rows = matrix.length;
    const columns = matrix[0].length;

    // 新しい行列を生成し、行と列を入れ替える
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

  const CONTENT_COLOR_MAP = {
    '講義': '#E65032',
    'バイト': '#53B09A',
    'NULL': '#A8A7A7'
  };

  // カレンダーセルを埋めるための関数
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
  
  // バックエンドからデータを取得する関数
  const fetchDataFromBackend = () => {
    // バックエンドのAPIエンドポイントを設定
    const backendApiUrl = '/get_calendar_data';

    fetch(backendApiUrl)
      .then((response) => response.json())
      .then((data) => {
        // バックエンドから受け取ったデータをカレンダーセルに反映するロジック
        if (data && data.cells) {
          setCells(reverseMatrix(fillCells(data.cells))); // カレンダーセルのデータを更新
        }
      })
      .catch((error) => {
        console.error('バックエンドからのデータ取得エラー:', error);
      });
  };

  useEffect(() => {
    // 初回レンダリング時にカレンダーセルを埋める
    setCells(reverseMatrix(fillCells(initialCells))); // セル行列を反転してセット
    // バックエンドから取得
    fetchDataFromBackend();
  }, []);

  const handleCellClick = (rowIndex, cellIndex) => {
    fetch('/process_cell_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rowIndex, cellIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedCell({ rowIndex, cellIndex });
        setPopupVisible(true);
      })
      .catch((error) => {
        console.error('エラー:', error);
      });
  };


  const handleContentChange = (content) => {
    if (selectedCell) {
      const color = CONTENT_COLOR_MAP[content];
      const newCells = cells.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
          if (rIndex === selectedCell.rowIndex && cIndex === selectedCell.cellIndex) {
            return { ...cell, content: content, color: color };
          }
          return cell;
        });
      });
      setCells(newCells);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handlePageChange = (event) => {
    // ページが変更されたときにセル行列を更新
    setPage(event.index);
  };

  const marginpx = '2px'

  const cellStyle = {
    flex: '1',
    width: 77.34,
    height: 103,
    margin: '1px',
    marginLeft: 0, // 最初のセルの左側のマージンを0に設定
    borderRadius: 3,
    cursor: 'pointer',
  };
  
  return (
    <Flicking horizontal={false} onChange={handlePageChange}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{width: '90%', height: '100%', background: '#ffffff', borderRadius: 30, overflow: 'hidden', border: '1px white solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 0 ,marginBottom: 0}}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  ...cellStyle,
                  marginLeft: cellIndex === 0 ? 0 : marginpx,
                  background: cell.color,
                }}
                >
                {cell.content}
              </div>
            ))}
        </div>
        ))}
      </div>
    </div>
    </Flicking>
  );
  
}
export default Calendar;
