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
    // console.log(this.props.data);

    const calendarData = this.props.data;  // propsからcalendarDataを取得
    const calendaday = this.props.day;  // propsからcalendarDataを取得

    if (!Array.isArray(calendarData)) {
      console.error('calendarData is not an array:', calendarData);
      return null;
    }
    const groupWeeks = (data, days) => {
      const weeks = [];
      const weeksDays = [];
      for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
        weeksDays.push(days.slice(i, i + 7));
      }
      return [weeks, weeksDays];
    };

    const splitData = (data) => {
      const firstSegment = data.slice(0, 5);
      const secondSegment = data.slice(5, 7);

      if (Array.isArray(data[0])) {
        // Handle 2D arrays
        const transposedFirstSegment = firstSegment[0].map((_, i) => firstSegment.map(row => row[i]));
        const transposedSecondSegment = secondSegment[0].map((_, i) => secondSegment.map(row => row[i]));
        return [transposedFirstSegment, transposedSecondSegment];
      }

      // Directly return segments for 1D arrays
      return [firstSegment, secondSegment];
    };

    function extractDayAndHandleMonthCrossing(dates) {
      const weekday = [];
      let monthCrossing = '';

      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        const currentMonth = date.getMonth() + 1;  // JavaScript's months start at 0
        const day = date.getDate();

        if (i === 0) {
          monthCrossing = `${currentMonth}`;  // Starting month
        }

        if (i > 0) {
          const prevDate = new Date(dates[i - 1]);
          const prevMonth = prevDate.getMonth() + 1;
          if (currentMonth !== prevMonth) {
            monthCrossing = `${prevMonth}-${currentMonth}`;  // Update for month-crossing
          }
        }

        weekday.push(`${day}`);
      }

      return { monthCrossings: monthCrossing, weekday };
    }


    const [groupedWeeks, groupedWeekdays] = groupWeeks(calendarData, calendaday);

    return (
      <Flicking plugins={this._plugins} circular={true}>
        {groupedWeeks.map((weekData, pageIndex) => {
          const {monthCrossings, weekday} = extractDayAndHandleMonthCrossing(groupedWeekdays[pageIndex]);
          // console.log(weekday);

          const [firstSegment, secondSegment] = splitData(weekData);

          const [firstSegmentDay, secondSegmentDay] = splitData((weekday));
          // console.log(firstSegmentDay);
          return (
              <>
                <div style={{ width: '90%', padding: '0 5%' }}>
                  <CalendarPage
                      cells={firstSegment}
                      days={firstSegmentDay}
                      // その他のprops...
                  />
                </div>
                <div style={{ width: '90%', padding: '0 5%' }}>
                  <CalendarPage
                      cells={secondSegment}
                      days={secondSegmentDay}
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
