function init() {
    var w = 500;
    var h = 200;
    var MaxValue = 25;
    var dataset = [14, 5, 26, 23, 9, 22, 24, 21, 17, 18];

    var xScale = d3.scaleLinear()
        .domain([0, dataset.length - 1])
        .range([0, w]);

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
        .attr("width", w / dataset.length - 1) // Add width for each bar
        .attr("height", function (d) {
            return h - yScale(d);
        })
        .attr("fill", "lightblue"); 

    //Add  x axis with ticks and labels

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(xScale)
            .ticks(dataset.length)
            .tickFormat(function (d, i) {
                return dataset[i]; // Display index as label
            })
            .tickSize(8)
        )
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("x", -10);

    svg.selectAll(".bar-label")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .text(function (d) {
            return d; // Display the value of the bar
        })
        .attr("x", function (d, i) {
            return xScale(i) + (w / dataset.length - 1) / 2; // Center the label in the bar
        })
        .attr("y", function (d) {
            return yScale(d) - 5; // Position above the bar
        })
        .attr("text-anchor", "middle")
        .attr("fill", "black")

    //add label for x axis
    svg.append("text")
        .attr("transform", "translate(" + (w / 2) + " ," + (h + 40) + ")")
        .style("text-anchor", "middle")
        .text("X Axis Label");
    // Add label for y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 50)
        .attr("x", 0 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Y Axis Label");
    d3.select("button")
        .on("click", function () {
            update();
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
            .duration(1000) // Transition duration
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return h - yScale(d);
            })
            .attr("fill", "lightblue");

        // Update labels
        svg.selectAll(".bar-label")
            .data(dataset)
            .transition()
            .duration(1000)
            .text(function (d) {
                return d;
            })
            .attr("y", function (d) {
                return yScale(d) - 5;
            });
    }

}

window.onload = init;