import { symbolStar, symbol } from 'd3';
import {select} from 'd3-selection';

export default (function (config, xScale) { return function (selection) {
	const shapeLine = select('.shape-line');
	const shape = shapeLine.selectAll('.shape')
		.remove()
		.data(({ data }) => data)
		.enter()
        .filter(function (d) { if (d.shape) {return d;} return false; })
        .append('path')
        .attr('transform', (d) => "translate(" + xScale(d.date) + "," + config.shapes[d.shape].offsetY + ")")
        .attr('d', symbol().size(140).type(symbolStar))
        .attr('fill', function (d) { return config.shapes[d.shape].fill; })
        .classed('shape', true)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)


	shapeLine.exit().remove()
	shape.exit().remove()
}; });
