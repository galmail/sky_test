import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3/build/d3';

import './LineChart.css';

class LineChart extends Component {

    constructor(props){
        super(props);
        this.rootElement = null;
        this.highlightIndicator = this.highlightIndicator.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    render() {
        return (
            <div ref={(el) => { this.rootElement = el; }} className="line-chart">
                The Chart is Loading...
            </div>
        );
    }

    componentDidUpdate() {
        // console.log('LineChart componentDidUpdate', this.props.data);
        if (this.props.data && this.props.data.length > 0) this.renderChart(this.props.data);
        else this.rootElement.innerHTML = 'No data to display';
    }

    renderChart(data) {
        this.rootElement.innerHTML = '';
        if (!data) return;

        // set the dimensions and margins of the chart
        const margin = this.props.margin;
        const width = this.props.width - margin.left - margin.right;
        const height = this.props.height - margin.top - margin.bottom;

        const totalWidth = width + margin.left + margin.right;
        const totalHeight = height + margin.top + margin.bottom;

        // set the ranges
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // define the line
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        const svg = d3.select(this.rootElement).append("svg")
            .attr("width", totalWidth)
            .attr("height", totalHeight)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, d3.max(data, function (d) { return d.value; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line);

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis-y")
            .call(d3.axisLeft(y));

        // Add Circle
        const focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle").attr("r", 7.5);

        this.highlightIndicator(focus, x, y);
    }

    highlightIndicator(el, x, y) {
        const dataObj = this.props.highlightValue;
        const display = dataObj ? null : 'none';
        if (dataObj) el.attr("transform", "translate(" + x(dataObj.date) + "," + y(dataObj.value) + ")");
        el.style("display", display);
    }

}

LineChart.propTypes = {
    margin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        value: PropTypes.number
    })),
    highlightValue: PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        value: PropTypes.number
    })
};

LineChart.defaultProps = {
    margin: { top: 20, right: 20, bottom: 30, left: 50 },
    width: 760,
    height: 300
}

export default LineChart;
