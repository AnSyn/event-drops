export default (function (config, xScale) { return function (selection) {
    var margin = config.margin, _a = config.bound, dateFormat = _a.format, location = _a.location, labelWidth = config.label.width, lineHeight = config.line.height;
    var bounds = selection.selectAll('.bound').data(function (d) { return d; });
    var boundsLabelLocation;
    if (location) {
        boundsLabelLocation = location;
    }
    else if (selection.data() && selection.data()[0]) {
        boundsLabelLocation = lineHeight * selection.data()[0].length + margin.top;
    }
    bounds
        .enter()
        .append('g')
        .classed('bound', true)
        .classed('start', true)
        .attr('transform', "translate(" + labelWidth + ", " + boundsLabelLocation + ")")
        .append('text')
        .text(dateFormat(xScale.domain()[0]));
    bounds
        .enter()
        .append('g')
        .classed('bound', true)
        .classed('end', true)
        .attr('transform', "translate(" + labelWidth + ", " + boundsLabelLocation + ")")
        .append('text')
        .attr('x', xScale.range()[1] - margin.right)
        .attr('text-anchor', 'end')
        .text(dateFormat(xScale.domain()[1]));
    bounds.selectAll('.bound.start text').text(dateFormat(xScale.domain()[0]));
    bounds.selectAll('.bound.end text').text(dateFormat(xScale.domain()[1]));
}; });
