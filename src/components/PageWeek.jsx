import React, { Component } from "react";
import Flicking from "@egjs/react-flicking";
import { Fade } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

import CalendarPage from './CalendarPage'
import PopupMenu from './PopupMenu'

export default class PageWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      selectedCell: null
    };
    this._plugins = [new Fade()];
  }

  setPopupVisible = (visible) => {
    this.setState({ popupVisible: visible });
  }

  setSelectedCell = (cell) => {
    this.setState({ selectedCell: cell });
  }

  handleCellClick = (rowIndex, cellIndex) => {
    fetch('/process_cell_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rowIndex, cellIndex }),
    })
    .then((response) => response.json())
    .then((data) => {
      this.setSelectedCell({ rowIndex, cellIndex });
      this.setPopupVisible(true);
    })
    .catch((error) => {
      console.error('エラー:', error);
    });
  };

  closePopup = () => {
    this.setPopupVisible(false);
  }

  render() {
    const formattedData = this.props.data || [];
    const weeks = [];

    for (let i = 0; i < formattedData.length; i += 7) {
      weeks.push(formattedData.slice(i, i + 7));
    }

    return (
      <>
        {weeks.map((week, weekIndex) => (
          <CalendarPage
            key={weekIndex}
            calendarData={week}
            marginpx="2px"
            handleDateClick={this.handleCellClick}
            handleEventClick={this.handleCellClick}
            handleContentChange={this.handleContentChange}
            popupVisible={this.state.popupVisible}
            closePopup={this.closePopup}
          />
        ))}
        {this.state.popupVisible && <PopupMenu onClose={this.closePopup} onContentChange={this.handleContentChange} />}
      </>
    );
  }
}
