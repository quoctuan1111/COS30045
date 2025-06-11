function init() {
    var w = 500;
    var h = 200;
    var MaxValue = 25;
    var dataset = [14, 5, 26, 23, 9, 22, 24, 21, 17, 18];

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.1);

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
        .attr("fill", "lightblue");

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

    d3.select("#Update")
        .on("click", function () {
            update();
        });

    d3.select("#Trans1")
        .on("click", function () {
            update1();
        });

    d3.select("#Trans2")
        .on("click", function () {
            update2();
        });

    function update() {
        var numValues = dataset.length;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * MaxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(1200)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "lightgreen");

        // Update labels
        svg.selectAll(".bar-label")
            .data(dataset)
            .transition()
            .duration(1000)
            .text(function(d) { return d; })
            .attr("y", function(d) { return yScale(d) - 5; });
    }

    function update1() {
        var numValues = dataset.length;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * MaxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(500)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "yellow");

        // Update labels
        svg.selectAll(".bar-label")
            .data(dataset)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(500)
            .attr("y", function (d) {
                return yScale(d) - 5;
            })
            .text(function (d) { return d; });
    }

    function update2() {
        var numValues = dataset.length;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * MaxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function (d, i) {
                return i / dataset.length * 1000;
            })
            .duration(500)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "red");

        // Update labels
        svg.selectAll(".bar-label")
            .data(dataset)
            .transition()
            .duration(1000)
            .text(function(d) { return d; })
            .attr("y", function(d) { return yScale(d) - 5; });
    }
}

window.onload = init;