import { Component } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Fade } from "@egjs/flicking-plugins";
import {FrameGrid} from "@egjs/react-grid"
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

import CalendarPage from './CalendarPage';

export default class PageWeek extends Component {
  _plugins = [new Fade()];

  render() {
    console.log(this.props.data);

    const calendarData = this.props.data;  // propsからcalendarDataを取得
    if (!Array.isArray(calendarData)) {
      console.error('calendarData is not an array:', calendarData);
      return null;
    }
    const groupWeeks = (data) => {
      const weeks = [];
      for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
      }
      return weeks;
    };

    const splitData = (data) => {
      const firstSegment = data.slice(0, 5); // 最初の5行
      const secondSegment = data.slice(5, 7); // 次の2行
  
      // 転置する
      const transposedFirstSegment = firstSegment[0].map((_, i) => firstSegment.map(row => row[i]));
      const transposedSecondSegment = secondSegment[0].map((_, i) => secondSegment.map(row => row[i]));
  
      return [transposedFirstSegment, transposedSecondSegment];
  };
  

    return (
      <Flicking plugins={this._plugins} circular={true}>
        {groupWeeks(calendarData).map((weekData, pageIndex) => {
          console.log(weekData);
            const [firstSegment, secondSegment] = splitData(weekData);
            return (
              <>
                <div style={{ width: '90%', padding: '0 5%' }}>
                  <CalendarPage
                      cells={firstSegment}
                      // その他のprops...
                  />
                </div>
                <div style={{ width: '90%', padding: '0 5%' }}>
                  <CalendarPage
                      cells={secondSegment}
                      // その他のprops...
                  />
                </div>
              </>
            );
        })}
      </Flicking>
    );
  }
}
