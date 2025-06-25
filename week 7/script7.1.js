function init() {
    var w = 600;
    var h = 300;
    var padding = 55;

    d3.csv("Unemployment_78-95.csv", function (d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };

    }).then(function (data) {
        lineChart(data);
    });

    function lineChart(dataset) {
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var xScale = d3.scaleTime()
            .domain(d3.extent(dataset, function (d) { return d.date; }), d3.max(dataset, function (d) { return d.date; }))
            .range([padding, w - padding]);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d.number; })])
            .range([h - padding, padding]);

        var xAxis = d3.axisBottom(xScale).ticks(10);
        var yAxis = d3.axisLeft(yScale).ticks(10);

        var area = d3.area()
            .x(function (d) { return xScale(d.date); })
            .y0(h - padding)
            .y1(function (d) { return yScale(d.number); });

        var areaPath = svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "steelblue");

        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000))
            .style("stroke", "red")
            .style("stroke-dasharray", "2");

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("fill", "red");
    }
}

window.onload = init;