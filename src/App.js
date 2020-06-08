import React from 'react';
import './App.css';
import Bar from './component/bar'
import line from './component/line'

class App extends React.Component {
  componentDidMount () {
    new Bar({ node: 'bar' }).draw()
    new line({ node: 'line' }).draw()
  }

  render () {
    return (
      <div className="charts-artboard">
        <div id="bar" className="chart-item"></div>
        <div id="groupBar" className="chart-item"></div>
        <div id="stackedBar" className="chart-item"></div>
        <div id="line" className="chart-item"></div>
      </div>
    )
  }
}

export default App;
