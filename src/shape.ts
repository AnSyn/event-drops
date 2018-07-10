import { symbolStar, symbol } from 'd3';
import { select } from 'd3-selection';

export default (function (config: any, xScale: any) { return function (selection: any) {
    const shapeLine = select('.shape-line');
    const shape = shapeLine.selectAll('.shape')
        .remove()
        .data(({ data }) => data)
        .enter()
        .filter(function (d: any) { if (d.shape) {return d;} return false; })
        .append('path')
        .attr('transform', (d: any) => "translate(" + xScale(d.date) + "," + config.shapes[d.shape].offsetY + ")")
        .attr('d', symbol().size(140).type(symbolStar))
        .attr('fill', function (d: any) { return config.shapes[d.shape].fill; })
        .classed('shape', true)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)


    shapeLine.exit().remove()
    shape.exit().remove()
}; });
