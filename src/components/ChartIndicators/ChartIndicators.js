import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChartIndicators.css';

class ChartIndicators extends Component {
  render() {
    const minTemp = this.props.min != null ? this.props.min : '-----';
    const maxTemp = this.props.max != null ? this.props.max : '-----';
    const avgTemp = this.props.avg != null ? this.props.avg : '-----';
    return (
      <div className="chart-indicators">
        <div className="min-temperature" onMouseOver={() => this.props.onHover('min')} onMouseOut={() => this.props.onHover()}>Min Temp: {minTemp}</div>
        <div className="max-temperature" onMouseOver={() => this.props.onHover('max')} onMouseOut={() => this.props.onHover()}>Max Temp: {maxTemp}</div>
        <div className="avg-temperature" onMouseOver={() => this.props.onHover('avg')} onMouseOut={() => this.props.onHover()}>Avg Temp: {avgTemp}</div>
      </div>
    );
  }
}

ChartIndicators.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  avg: PropTypes.number,
  onHover: PropTypes.func,
};

ChartIndicators.defaultProps = {
  onHover: () => {}
};

export default ChartIndicators;
