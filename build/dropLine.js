import drop from './drop';
export default (function (config, xScale) { return function (selection) {
    var metaballs = config.metaballs, _a = config.label, labelText = _a.text, labelPadding = _a.padding, labelWidth = _a.width, _b = config.line, lineColor = _b.color, lineHeight = _b.height;
    var lines = selection.selectAll('.drop-line').data(function (d) { return d; });
    var g = lines
        .enter()
        .append('g')
        .classed('drop-line', true)
        .attr('fill', lineColor)
        .attr('transform', function (_, index) { return "translate(0, " + index * lineHeight + ")"; });
    g
        .append('line')
        .classed('line-separator', true)
        .attr('x1', labelWidth)
        .attr('x2', '100%')
        .attr('y1', function () { return lineHeight; })
        .attr('y2', function () { return lineHeight; });
    var drops = g
        .append('g')
        .classed('drops', true)
        .attr('transform', function () { return "translate(" + labelWidth + ", " + lineHeight / 2 + ")"; })
        .call(drop(config, xScale));
    drops
        .append('rect') // The rect allow us to size the drops g element
        .attr('x', 0)
        .attr('y', -config.line.height / 2)
        .attr('width', 1) // For the rect to impact its parent size it must have a non zero width
        .attr('height', config.line.height)
        .attr('fill', 'transparent');
    if (metaballs) {
        drops.style('filter', 'url(#metaballs)');
    }
    g
        .append('text')
        .attr('x', labelWidth - labelPadding)
        .attr('y', lineHeight / 2)
        .attr('dy', '0.25em')
        .attr('text-anchor', 'end')
        .text(labelText);
    lines.selectAll('text').text(labelText);
    lines.selectAll('.drops').call(drop(config, xScale));
    lines.exit().remove();
}; });
