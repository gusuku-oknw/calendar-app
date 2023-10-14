import React, { Component } from 'react';
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

export default class DemoComponent extends Component {
  render() {
    const panelStyle = {
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <Flicking
        circular={true}
        horizontal={false}
        plugins={[new AutoPlay(2000)]} // 2000ms = 2秒ごとに自動再生
        style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100px' }} // viewportのスタイル
      >
        <div style={panelStyle}>Panel 1</div>
        <div style={panelStyle}>Panel 2</div>
        <div style={panelStyle}>Panel 3</div>
      </Flicking>
    );
  }
}
