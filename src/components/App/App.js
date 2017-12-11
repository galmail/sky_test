import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTemperatures } from '../../actions/service';

import LineChart from '../Chart/LineChart';
import Filters from '../Filters';
import ChartIndicators from '../ChartIndicators';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      toDate: null,
      highlightValue: null
    }
    if (props.getTemperatures) props.getTemperatures();
    this.filtersChanged = this.filtersChanged.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  filtersChanged({ fromDate, toDate }) {
    this.setState({ fromDate, toDate });
  }

  highlight({ data, min, max, indicator }){
    let highlightValue = null;
    if (indicator === 'min') {
      highlightValue = data.find(obj => obj.value === min);
    }
    if (indicator === 'max') {
      highlightValue = data.find(obj => obj.value === max);
    }
    this.setState({ highlightValue });
  }

  filterByDates(data, from, to) {
    if (!data || data.length === 0) return data;
    return data.filter(obj => (from ? obj.date >= from : true) && (to ? obj.date <= to : true));
  }

  calculateMinMaxAvg(data) {
    if (!data || data.length === 0) return {};
    const min = data.reduce((prev, curr) => prev.value < curr.value ? prev : curr);
    const max = data.reduce((prev, curr) => prev.value > curr.value ? prev : curr);
    const avg = data.reduce((sum, dataObj) => sum + parseFloat(dataObj.value), 0) / data.length;
    return {
      min: min.value,
      max: max.value,
      avg: Math.round(avg * 100) / 100
    };
  }
  
  render() {
    const data = this.filterByDates(this.props.temperatures, this.state.fromDate, this.state.toDate);
    const { min, max, avg } = this.calculateMinMaxAvg(data);
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Filters onChange={this.filtersChanged} />
        <LineChart  data={data}
                    highlightValue={this.state.highlightValue}
        />
        <ChartIndicators  min={min}
                          max={max}
                          avg={avg}
                          onHover={(indicator) => this.highlight({ data, min, max, indicator })}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => bindActionCreators({ getTemperatures }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export { App };
