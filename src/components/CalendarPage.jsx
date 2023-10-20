import React from 'react';
import PopupMenu from './PopupMenu';


const baseCellStyle = {
    flex: '1',
    width: 77.34,
    height: 103,
    margin: '1px',
    marginLeft: 0,
    borderRadius: 3,
    cursor: 'pointer',
    color: '#ffffff',
    // writingMode: 'horizontal-tb',
    textOrientation: 'upright',
    // textAlign: 'center',
};

function styleController(styles) {
    let modifiedStyle = {...baseCellStyle};  // Start with the base style
    // console.log(styles)

    switch (styles) {
        case 'low':
            modifiedStyle = {
                ...modifiedStyle,
                // color: 'rgba(255;255;255;0.50)',
                fontSize: 10,
                fontFamily: 'Inria Sans',
                fontWeight: '300',
                wordWrap: 'break-word'
            };
            break;

        case 'middle':
            modifiedStyle = {
                ...modifiedStyle,
                color: 'rgba(255, 255, 255, 0.90)',
                fontSize: 12,
                fontFamily: 'Inria Serif',
                fontWeight: '300',
                wordWrap: 'break-word'
            };
            break;

        case 'high':
            modifiedStyle = {
                ...modifiedStyle,
                // position: 'relative',  // このプロパティは親要素に適用する場合のものなので、適切な場所に配置してください
                // height: '100px',       // 同上
                // whiteSpace: 'nowrap',  // 同上
                fontSize: 15,
                width: 57.34,
                // display: 'inline',     // オブジェクトのプロパティとしての表現方法が不明確なので、適切な形式に変更するか確認が必要です
                // position: 'absolute',  // 上記と同じ理由
                justifyContent: 'center',  // 水平中央揃え
                alignItems: 'center',      // 垂直中央揃え
                // writingMode: 'vertical-rl',
                // msWritingMode: 'horizontal-tb', // "-ms-writing-mode"の適切なオブジェクトのプロパティ表現が不明確です
                // left: '50%',
                // top: '50%',
                // transform: 'translate(-50%, -50%)',
                fontFamily: 'Inria Sans',
                fontWeight: '700',
                wordWrap: 'break-word'
            };
            break;

        default:
            modifiedStyle = {
                ...modifiedStyle
            };
            break;
    }
    return { cellStyle: modifiedStyle };

}

const dayStyle = {
    flex: '1',
    width: 77.34,
    height: 10,
    margin: '1px',
    marginLeft: 0,
    borderRadius: 3,
    cursor: 'pointer',
    fontSize: '10px',
    textAlign: 'center',
};

export default function CalendarPage({
    cells = [],
    days = [],  // Default value,
    marginpx,
    handleCellClick,
    handleContentChange,
    popupVisible,
    closePopup
}) {
    return (
        <>
            <div style={{ display: 'flex' }}>
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} style={{...dayStyle, background: '#f5f5f5'}}>
                        {day}
                    </div>
                ))}
            </div>
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            style={{
                                ...styleController(cell.styles).cellStyle,
                                marginLeft: cellIndex === 0 ? 0 : marginpx,
                                background: cell.color || '#000000',
                                lineHeight: `${baseCellStyle.height}px`,
                            }}
                            onClick={() => handleCellClick(rowIndex, cellIndex)}
                        >
                            {cell.content !== 'NULL' ? cell.content : ""}
                        </div>
                    ))}
                </div>
            ))}
            {popupVisible && <PopupMenu onClose={closePopup} onContentChange={handleContentChange} />}
        </>
    );
}
