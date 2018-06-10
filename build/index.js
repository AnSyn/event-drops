var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { defaultsDeep } from 'lodash';
import axis from './axis';
import bounds from './bounds';
import defaultConfiguration from './config';
import dropLine from './dropLine';
import zoom from './zoom';
import { addMetaballsDefs } from './metaballs';
import './style.css';
import { withinRange } from './withinRange';
import { addHighLight } from './highlightFilter';
import shapes from './shapes';
// do not export anything else here to keep window.eventDrops as a function
export default (function (_a) {
    var _b = _a.d3, d3 = _b === void 0 ? window['d3'] : _b, customConfiguration = __rest(_a, ["d3"]);
    var draw; // doesn't pass lint otherwise
    var chart = function (selection) {
        var config = defaultsDeep(customConfiguration || {}, defaultConfiguration(d3));
        var zoomConfig = config.zoom, _a = config.drop, onClick = _a.onClick, onMouseOut = _a.onMouseOut, onMouseOver = _a.onMouseOver, metaballs = config.metaballs, highlight = config.highlight, labelWidth = config.label.width, lineHeight = config.line.height, _b = config.range, rangeStart = _b.start, rangeEnd = _b.end, margin = config.margin;
        var getEvent = function () { return d3.event; }; // keep d3.event mutable see https://github.com/d3/d3/issues/2733
        // Follow margins conventions (https://bl.ocks.org/mbostock/3019563)
        var width = selection.node().clientWidth - margin.left - margin.right;
        var xScale = d3
            .scaleTime()
            .domain([rangeStart, rangeEnd])
            .range([0, width - labelWidth]);
        chart._scale = xScale;
        var root = selection.selectAll('svg').data(selection.data());
        root.exit().remove();
        var svg = root
            .enter()
            .append('svg')
            .attr('width', width)
            .classed('event-drop-chart', true);
        var def = svg.append('defs');
        if (zoomConfig) {
            svg.call(zoom(d3, svg, config, xScale, draw, getEvent));
        }
        if (metaballs) {
            def.call(addMetaballsDefs(config));
        }
        if (highlight) {
            def.call(addHighLight(config));
        }
        svg
            .merge(root)
            .attr('height', function (d) { return (d.length + 1) * lineHeight + margin.top + margin.bottom; });
        svg
            .append('g')
            .classed('viewport', true)
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")")
            .call(draw(config, xScale));
    };
    chart.scale = function () { return chart._scale; };
    chart.filteredData = function () { return chart._filteredData; };
    draw = function (config, scale) { return function (selection) {
        var dropDate = config.drop.date;
        var dateBounds = scale.domain().map(function (d) { return new Date(d); });
        var filteredData = selection.data().map(function (dataSet) {
            return dataSet.map(function (row) {
                if (!row.fullData) {
                    row.fullData = row.data;
                }
                row.data = row.fullData.filter(function (d) {
                    return withinRange(dropDate(d), dateBounds);
                });
                return row;
            });
        });
        chart._scale = scale;
        chart._filteredData = filteredData[0];
        selection
            .data(filteredData)
            .call(dropLine(config, scale))
			.call(shapes(config, scale))
			.call(bounds(config, scale))
            .call(axis(d3, config, scale));
    }; };
    chart.draw = draw;
    return chart;
});
