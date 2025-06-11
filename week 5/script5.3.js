function init() {
    var w = 500;
    var h = 200;
    var MaxValue = 25;
    var dataset = [14, 5, 26, 23, 9, 22, 24, 21, 17, 18];

    // ordinal data
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    // quantitive data
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h, 0]);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return h - yScale(d);
        })
        .attr("fill", "lightgreen");

    // Add labels
    svg.selectAll(".bar-label")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return yScale(d) - 5;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(function (d) { return d; });

    d3.select("#Add")
        .on("click", function () {
            UpdateAdd();
        });

    d3.select("#Remove")
        .on("click", function () {
            UpdateRemove();
        });

    function UpdateAdd() {
        var NewNumber = Math.floor(Math.random() * MaxValue);
        dataset.push(NewNumber);

        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset);

        bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "purple")
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "purple");

        bars.exit().remove();

        // Update labels
        var labels = svg.selectAll(".bar-label")
            .data(dataset);

        labels.enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", w)
            .attr("y", function (d) { return yScale(d) - 5; })
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .merge(labels)
            .transition()
            .duration(500)
            .attr("x", function (d, i) { return xScale(i) + xScale.bandwidth() / 2; })
            .attr("y", function (d) { return yScale(d) - 5; })
            .text(function (d) { return d; });

        labels.exit().remove();
    }

    function UpdateRemove() {
        dataset.shift();
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset);

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();

        bars.transition()
            .duration(500)
            .attr("x", function (d, i) { return xScale(i); })
            .attr("y", function (d) { return yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return h - yScale(d); });

        // Update labels
        var labels = svg.selectAll(".bar-label")
            .data(dataset);

        labels.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();

        labels.transition()
            .duration(500)
            .attr("x", function (d, i) { return xScale(i) + xScale.bandwidth() / 2; })
            .attr("y", function (d) { return yScale(d) - 5; })
            .text(function (d) { return d; });
    }
}

window.onload = init;