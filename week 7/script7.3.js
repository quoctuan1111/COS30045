function init() {
    var w = 800, h = 400, padding = 50;
    var dataset = [

        { apples: 5, oranges: 10, grapes: 22 },

        { apples: 4, oranges: 12, grapes: 28 },

        { apples: 2, oranges: 19, grapes: 32 },

        { apples: 7, oranges: 23, grapes: 35 },

        { apples: 23, oranges: 17, grapes: 43 }

    ];

    var stack = d3.stack()
        .keys(["apples", "oranges", "grapes"])

    var series = stack(dataset);
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function (d, i) {
            return color(i);
        })

    var xScale = d3.scaleBand()
        .domain(dataset.map(function (d, i) {
            return i;
        }))
        .range([0, w])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])
        .range([h, 0]);

    var rects = groups.selectAll("rect")
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d, i) {
            return yScale(d[1]);
        })
        .attr("height", function (d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth());

    var tooltip = d3.select("#tooltip");

    rects.on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible")
            .html(`Value: ${d[1] - d[0]}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
        });

    rects.attr("y", h)
        .attr("height", 0)
        .transition()
        .duration(800)
        .attr("y", function (d) {
            return yScale(d[1]);
        })
        .attr("height", function (d) {
            return yScale(d[0]) - yScale(d[1]);
        });

    var keys = ["apples", "oranges", "grapes"];
    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cx", 10)
        .attr("cy", function (d, i) { return 10 + i * 25 }) 
        .attr("r", 7)
        .style("fill", function (d) { return color(keys.indexOf(d)) })

    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 30)
        .attr("y", function (d, i) { return 10 + i * 25 })
        .style("fill", function (d) { return color(keys.indexOf(d)) })
        .text(function (d) { return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
}

window.onload = init;
