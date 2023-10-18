import { Component } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Fade } from "@egjs/flicking-plugins";
import {FrameGrid} from "@egjs/react-grid"
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

import CalendarPage from './CalendarPage'


const CONTENT_COLOR_MAP = {
  '講義': '#E65032',
  'バイト': '#2B5B75',
  'NULL': '#A8A7A7'
};
const defaultCalendarData = [
  // 1ページ目のデータ
  [
  [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
  ],
  // 2ページ目のデータ
  [
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      ],
  // 3ページ目のデータ
  [
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['バイト'], content: 'バイト' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      // [{ color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['講義'], content: '講義' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }, { color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' }],
      ],
  ];
export default class DemoComponent extends Component {
  _plugins = [new Fade()];

  render() {
    const gridStyle = {
      width: '80%',
      margin: '0 auto', // センタリングのためのスタイルを追加
      boxSizing: 'border-box', // width にパディングやボーダーを含めるためのスタイルを追加
    };
    const gridStyle1 = {
      width: '30%',
      margin: '0 auto', // センタリングのためのスタイルを追加
      boxSizing: 'border-box', // width にパディングやボーダーを含めるためのスタイルを追加
    };

    const colorStyles = {
      8: { background: '#FFFFFF', color: '#000000' },
      9: { background: '#999999', color: '#FFFFFF' },
      10: { background: '#33AADD', color: '#FFFFFF' },
      11: { background: '#33AA55', color: '#FFFFFF' },
      12: { background: '#FFEE33', color: '#000000' },
      13: { background: '#FF4455', color: '#FFFFFF' },
    };

    const splitData = (data) => {
      const firstSegment = data.map(row => row.slice(0, 5));
      const secondSegment = data.map(row => row.slice(5, 7));
    
      return [firstSegment, secondSegment];
    }

    return (
      <Flicking plugins={this._plugins} circular={true}>
        {defaultCalendarData.map((pageData, pageIndex) => {
            const [firstSegment, secondSegment] = splitData(pageData);
            return (
              <>
            <div style={{  width: '90%', padding: '0 5%' }}>
              <CalendarPage
                  cells={firstSegment}
                  // marginpx={marginpx}
                  // handleCellClick={handleCellClick}
                  // handleContentChange={handleContentChange}
                  // popupVisible={popupVisible}
                  // closePopup={closePopup}
              />
            </div>

            <div style={{  width: '90%', padding: '0 5%' }}>
              <CalendarPage
                  cells={secondSegment}
                  // marginpx={marginpx}
                  // handleCellClick={handleCellClick}
                  // handleContentChange={handleContentChange}
                  // popupVisible={popupVisible}
                  // closePopup={closePopup}
              />
            </div>
            <div style={{  width: '90%', padding: '0 5%' }}>
              <CalendarPage
                  cells={firstSegment}
                  // marginpx={marginpx}
                  // handleCellClick={handleCellClick}
                  // handleContentChange={handleContentChange}
                  // popupVisible={popupVisible}
                  // closePopup={closePopup}
              />
            </div>

            <div style={{  width: '90%', padding: '0 5%' }}>
              <CalendarPage
                  cells={secondSegment}
                  // marginpx={marginpx}
                  // handleCellClick={handleCellClick}
                  // handleContentChange={handleContentChange}
                  // popupVisible={popupVisible}
                  // closePopup={closePopup}
              />
            </div>
            </>
            )})}


        {/* </FrameGrid> */}

        {/* <div className="grid-panel" style={gridStyle}>7</div> */}

        {/* 上のFrameGridと同じスタイルが適用されるものと仮定
        <FrameGrid className="grid-panel">
          <div style={{...colorStyles[8], ...gridStyle}}>8</div>
          <div style={{...colorStyles[9], ...gridStyle}}>9</div>
          <div style={{...colorStyles[10], ...gridStyle}}>10</div>
          <div style={{...colorStyles[11], ...gridStyle}}>11</div>
          <div style={{...colorStyles[12], ...gridStyle}}>12</div>
          <div style={{...colorStyles[13], ...gridStyle}}>13</div>
        </FrameGrid> */}

      </Flicking>
    );
  }
}
