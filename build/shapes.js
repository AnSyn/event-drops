import { symbolStar, symbol } from 'd3';
import  shape from './shape'
import drop from "new-ansyn-event-drops/drop";
export default (function (config, xScale) { return function (selection) {

	var shapeLines = selection.selectAll('.shape-line')
        .data(d => d)

	shapeLines
        .enter()
        .append('g')
        .classed('shape-line', true)
        .attr('width', xScale.range()[1])
		.call(shape(config, xScale))
		.merge(shapeLines)

	shapeLines
		.append('rect') // The rect allow us to size the drops g element
		.attr('x', 0)
		.attr('y', -config.line.height / 2)
		.attr('width', 1) // For the rect to impact its parent size it must have a non zero width
		.attr('height', config.line.height)
		.attr('fill', 'transparent');

	shapeLines.selectAll('.shape').call(shape(config, xScale));
	shapeLines.exit().remove();
}; });
