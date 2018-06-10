export var withinRange = function (date, dateBounds) {
    var startingDate = Math.min.apply(Math, dateBounds);
    var endingDate = Math.max.apply(Math, dateBounds);
    // @TODO: remove the `new Date()` constructor in the next major version: we need to force it at configuration level.
    return new Date(date) >= startingDate && new Date(date) <= endingDate;
};
