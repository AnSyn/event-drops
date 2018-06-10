export var tickFormat = function (date, formats, d3) {
    if (d3.timeSecond(date) < date) {
        return d3.timeFormat(formats.milliseconds)(date);
    }
    if (d3.timeMinute(date) < date) {
        return d3.timeFormat(formats.seconds)(date);
    }
    if (d3.timeHour(date) < date) {
        return d3.timeFormat(formats.minutes)(date);
    }
    if (d3.timeDay(date) < date) {
        return d3.timeFormat(formats.hours)(date);
    }
    if (d3.timeMonth(date) < date) {
        if (d3.timeWeek(date) < date) {
            return d3.timeFormat(formats.days)(date);
        }
        return d3.timeFormat(formats.weeks)(date);
    }
    if (d3.timeYear(date) < date) {
        return d3.timeFormat(formats.months)(date);
    }
    return d3.timeFormat(formats.year)(date);
};
export default (function (d3, config, xScale) {
    var labelWidth = config.label.width, formats = config.axis.formats, locale = config.locale;
    d3.timeFormatDefaultLocale(locale);
    return function (selection) {
        var axis = selection.selectAll('.axis').data(function (d) { return d; });
        axis.exit().remove();
        var axisTop = d3
            .axisTop(xScale)
            .tickFormat(function (d) { return tickFormat(d, formats, d3); });
        axis
            .enter()
            .filter(function (_, i) { return !i; })
            .append('g')
            .classed('axis', true)
            .attr('transform', "translate(" + labelWidth + ",0)")
            .call(axisTop);
        axis.call(axisTop);
    };
});
