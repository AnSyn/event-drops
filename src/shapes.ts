import shape from './shape';

export default (function (config: any, xScale: any) {
    return function (selection: any) {

        const shapeLines = selection.selectAll('.shape-line')
            .data((d: any) => d);

        shapeLines
            .enter()
            .append('g')
            .classed('shape-line', true)
            .attr('width', xScale.range()[1])
            .call(shape(config, xScale))
            .merge(shapeLines);

        shapeLines
            .append('rect') // The rect allow us to size the drops g element
            .attr('x', 0)
            .attr('y', -config.line.height / 2)
            .attr('width', 1) // For the rect to impact its parent size it must have a non zero width
            .attr('height', config.line.height)
            .attr('fill', 'transparent');

        shapeLines.exit().remove();
    };
});
