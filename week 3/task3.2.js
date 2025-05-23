function init() {
    var w = 900;
    var h = 400;
    var padding = 50;
    var dataset = [
        [5, 20],
        [500, 90],
        [250, 50],
        [100, 33],
        [330, 95],
        [410, 12],
        [475, 44],
        [25, 67],
        [85, 21],
        [220, 88],
    ];
    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, function (d) {
            return d[0];
        }),
        d3.max(dataset, function (d) {
            return d[0];
        })])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(dataset, function (d) {
            return d[1];
        }),
        d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([h - padding, padding]);

    var xAxis = d3.axisBottom().ticks(5).scale(xScale);
    var yAxis = d3.axisLeft().ticks(7).scale(yScale);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Draw circles
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", 7)
        .attr("fill", function (d) {
            return d[0] > 300 ? "red" : "slategrey";
        });

    // Draw text
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function (d) {
            return xScale(d[0]);
        })
        .attr("y", function (d) {
            return yScale(d[1]) - 10;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "green");

    // Draw X axis
    svg.append("g")
        .attr("transform", "translate(0," + (h - padding + 10) + ")")
        .call(xAxis);
    // Draw Y axis
    svg.append("g")
        .attr("transform", "translate(" + padding + ",10)")
        .call(yAxis);

}

window.onload = init;