import React from 'react';
import Flicking from "@egjs/react-flicking";
import PopupMenu from './PopupMenu';

    const cellStyle = {
        flex: '1',
        width: 77.34,
        height: 103,
        margin: '1px',
        marginLeft: 0,
        borderRadius: 3,
        cursor: 'pointer',
    };
    export default function CalendarPage({cells, marginpx, handleCellClick, handleContentChange, popupVisible, closePopup}) {
    return (
        <>
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            style={{
                                ...cellStyle,
                                marginLeft: cellIndex === 0 ? 0 : marginpx,
                                background: cell.color,
                                textAlign: 'center',
                                lineHeight: `${cellStyle.height}px`,
                            }}
                            onClick={() => handleCellClick(rowIndex, cellIndex)}
                        >
                            {cell.content !== 'NUL' ? cell.content : ""}
                        </div>
                    ))}
                </div>
            ))}
            {popupVisible && <PopupMenu onClose={closePopup} onContentChange={handleContentChange} />}
        </>
    );
};
