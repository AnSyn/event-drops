export var getShiftedTransform = function (originalTransform, labelsWidth, labelsPadding, d3) {
    var fullLabelWidth = labelsWidth + labelsPadding;
    var x = originalTransform.x, y = originalTransform.y, k = originalTransform.k;
    return d3.zoomIdentity
        .translate(-fullLabelWidth, 0) // move origin as if there were no labels
        .translate(x, y) // apply zoom transformation panning
        .scale(k) // apply zoom transformation scaling
        .translate(labelsWidth + labelsPadding, 0); // put origin at its original position
};
export default (function (d3, svg, config, xScale, draw, getEvent) {
    var _a = config.label, labelsWidth = _a.width, labelsPadding = _a.padding, _b = config.zoom, onZoomStart = _b.onZoomStart, onZoom = _b.onZoom, onZoomEnd = _b.onZoomEnd, minimumScale = _b.minimumScale, maximumScale = _b.maximumScale;
    var zoom = d3.zoom().scaleExtent([minimumScale, maximumScale]);
    zoom.on('zoom.start', onZoomStart).on('zoom.end', onZoomEnd);
    zoom.on('zoom', function (args) {
        var transform = getShiftedTransform(getEvent().transform, labelsWidth, labelsPadding, d3);
        var newScale = transform.rescaleX(xScale);
        svg.call(draw(config, newScale));
        if (onZoom) {
            //onZoom(args);
        }
    });
    return zoom;
});
