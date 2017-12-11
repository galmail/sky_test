import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Filters.css';

const DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';

class Filters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: props.fromDate,
      toDate: props.toDate,
    };
  }

  onChange(dateType, value) {
    const dateObj = moment(value, DATETIME_FORMAT);
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    if (dateType === 'fromDate') {
      if (dateObj.isValid()) fromDate = dateObj.toDate();
      else fromDate = null;
    }
    if (dateType === 'toDate') {
      if (dateObj.isValid()) toDate = dateObj.toDate();
      else toDate = null;
    }
    this.setState({ fromDate, toDate }, () => this.props.onChange(this.state));
  }
  
  render() {
    const fromDate = this.state.fromDate ? moment(this.state.fromDate).format(DATETIME_FORMAT) : '';
    const toDate = this.state.toDate ? moment(this.state.toDate).format(DATETIME_FORMAT) : '';
    return (
      <div className="filters">
        <div className="startDate">
          <label>From:</label>
          <input id="startDateId" type="datetime-local" value={fromDate} onChange={(e) => this.onChange('fromDate', e.target.value)} />
        </div>
        <div className="endDate">
          <label>To:</label>
          <input id="endDateId" type="datetime-local" value={toDate} onChange={(e) => this.onChange('toDate', e.target.value)} />
        </div>
      </div>
    );
  }

}


Filters.propTypes = {
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

Filters.defaultProps = {
  fromDate: new Date(1481414591537),
  toDate: new Date(1512950630150),
  onChange: () => {},
};

export default Filters;



