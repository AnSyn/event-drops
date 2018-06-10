var METABALL_DEF_ID = 'metaballs';
export var addMetaballsDefs = function (config) { return function (selection) {
    var _a = config.metaballs, blurDeviation = _a.blurDeviation, colorMatrix = _a.colorMatrix;
    var filter = selection.append('filter').attr('id', METABALL_DEF_ID);
    filter
        .append('feGaussianBlur')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', blurDeviation)
        .attr('result', 'blur');
    filter
        .append('feColorMatrix')
        .attr('in', 'blur')
        .attr('mode', 'matrix')
        .attr('values', colorMatrix)
        .attr('result', 'contrast');
    filter
        .append('feBlend')
        .attr('in', 'SourceGraphic')
        .attr('in2', 'contrast');
}; };
export var addMetaballsStyle = function (selection) {
    return selection.style('filter', "url(" + METABALL_DEF_ID + ")");
};
