export default (config, xScale) => selection => {
	const {
		margin,
		bound: { format: dateFormat, location },
		label: { width: labelWidth },
		line: { height: lineHeight }

	} = config;

	const bounds = selection.selectAll('.bound');
	const dataBounds = bounds.data(d => d);
	const startTimeString = dateFormat(xScale.domain()[0]).toString();
	const endTimeString = dateFormat(xScale.domain()[1]).toString();
    let boundsLabelLocation;
	if (location) {
		boundsLabelLocation = location;
	}
	else if (selection.data() && selection.data()[0]) {
		boundsLabelLocation = lineHeight * selection.data()[0].length + margin.top;
	}

    dataBounds
		.enter()
		.append('g')
		.classed('bound', true)
		.classed('start', true)
		.attr(
			'transform',
			`translate(${labelWidth}, ${boundsLabelLocation})`
		)
		.append('text')
		.text(startTimeString);

    dataBounds
		.enter()
		.append('g')
		.classed('bound', true)
		.classed('end', true)
		.attr(
			'transform',
			`translate(${labelWidth}, ${boundsLabelLocation})`
		)
		.append('text')
		.attr('x', xScale.range()[1] - margin.right)
		.attr('text-anchor', 'end')
		.text(endTimeString);

	bounds.selectAll('.bound.start text').text(startTimeString);
	bounds.selectAll('.bound.end text').text(endTimeString);
};
