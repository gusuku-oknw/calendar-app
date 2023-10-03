import React, { useState } from 'react';

const Calendar = () => {

  const [cells, setCells] = useState([
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' }],
    [{ color: '#A8A7A7', content: 'NULL' }, { color: '#53B09A', content: 'バイト' }],
    // 他のセル情報を追加
  ]);

  const CONTENT_COLOR_MAP = {
    '講義': '#E65032',
    'バイト': '#53B09A',
    'NULL': '#A8A7A7'
  };
  
  const handleCellClick = (rowIndex, cellIndex) => {
    const cellContent = prompt('Enter content (講義 or バイト):');
    
    if (cellContent !== null) {
      const color = CONTENT_COLOR_MAP[cellContent];
  
      if (color !== undefined) {
        const newCells = cells.map((row, rIndex) => {
          return row.map((cell, cIndex) => {
            if (rIndex === rowIndex && cIndex === cellIndex) {
              return { ...cell, content: cellContent, color: color };
            }
            return cell;
          });
        });
        setCells(newCells);
      } else {
        alert('Invalid content. Please enter 講義 or バイト.');
      }
    }
  };

  const color = CONTENT_COLOR_MAP['NULL'];
  // カレンダーが5x5になるようにセル情報を埋める
  while (cells.length < 5) {
    const newRow = Array(5).fill({ color: color, content: 'NULL' });
    cells.push(newRow);
  }
  
  // 各行が5つのセルを持つように足りないセルを追加
  cells.forEach((row) => {
    while (row.length < 5) {
      row.push({ color: color, content: 'NULL' });
    }
  });

  const cellStyle = {
    width: 77.34,
    height: 103,
    margin: '5px',
    borderRadius: 5,
    cursor: 'pointer',
  };


  return (
    <div>
      {cells.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{
                ...cellStyle,
                background: cell.color,
              }}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            >
              {cell.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;