import { uniqBy } from 'lodash';
var filterOverlappingDrop = function (xScale, dropDate) { return function (d) {
    return uniqBy(d.data, function (data) { return Math.round(xScale(dropDate(data))); });
}; };
// const noFilterOverlap = (line) => {
//
// }
export default (function (config, xScale) { return function (selection) {
    var _a = config.drop, dropColor = _a.color, dropRadius = _a.radius, dropDate = _a.date, onClick = _a.onClick, onMouseOver = _a.onMouseOver, onMouseOut = _a.onMouseOut, onDblClick = _a.onDblClick, dropClass = _a.dropClass, dropId = _a.dropId;
    var drops = selection
        .selectAll('.drop')
        .data(function (line) { return line.data; });
    // .data(filterOverlappingDrop(xScale, dropDate));
    drops
        .enter()
        .append('circle')
        .attr('class', 'drop')
        .attr('r', dropRadius)
        .attr('fill', dropColor)
        .on('mousedown', onClick)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .on('dblclick', onDblClick)
        .merge(drops)
        .attr('id', dropId)
        .attr('cx', function (d) { return xScale(dropDate(d)); });
    drops
        .exit()
        .on('click', null)
        .on('mouseover', null)
        .on('mouseout', null)
        .remove();
}; });
