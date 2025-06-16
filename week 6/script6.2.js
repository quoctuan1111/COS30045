function init() {
    var w = 500;
    var h = 200;
    var MaxValue = 30;
    var dataset = [14, 5, 25, 23, 9, 22, 24, 21, 17, 18];
    var sort = "unsorted";

    // ordinal data
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    // quantitive data
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset) + 5]) 
        .range([h, 0]);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Draw initial bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) { return yScale(d); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return h - yScale(d); })
        .attr("fill", "#6c7a89")
        .on("mouseover", function (event, d, i) {
            d3.select(this).attr("fill", "orange");
            // Add label
            svg.append("text")
                .attr("class", "bar-label")
                .attr("x", +d3.select(this).attr("x") + xScale.bandwidth() / 2)
                .attr("y", +d3.select(this).attr("y") + 18)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("font-weight", "bold")
                .attr("fill", "#222")
                .text(d);
        })
        .on("mouseout", function (event, d) {
            d3.select(this).attr("fill", "#6c7a89");
            svg.selectAll(".bar-label").remove();
        });

    d3.select("#Add")
        .on("click", function () {
            UpdateAdd();
        });

    d3.select("#Remove")
        .on("click", function () {
            UpdateRemove();
        });

      d3.select("#SortButton")
        .on("click", function(){
            UpdateSort();

        });

    function UpdateAdd() {
        var NewNumber = Math.floor(Math.random() * MaxValue) + 1;
        dataset.push(NewNumber);

        yScale.domain([0, d3.max(dataset) + 5]);
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset);

        
        var barsEnter = bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function (d) { return yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return h - yScale(d); })
            .attr("fill", "#6c7a89")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "orange");
                svg.append("text")
                    .attr("class", "bar-label")
                    .attr("x", +d3.select(this).attr("x") + xScale.bandwidth() / 2)
                    .attr("y", +d3.select(this).attr("y") + 18)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "16px")
                    .attr("font-weight", "bold")
                    .attr("fill", "#222")
                    .text(d);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("fill", "#6c7a89");
                svg.selectAll(".bar-label").remove();
            });

        // UPDATE + ENTER
        bars.merge(barsEnter)
            .transition()
            .duration(500)
            .attr("x", function (d, i) { return xScale(i); })
            .attr("y", function (d) { return yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return h - yScale(d); })
            .attr("fill", "#6c7a89");

        bars.exit().remove();
    }

    function UpdateRemove() {
        dataset.shift();

        yScale.domain([0, d3.max(dataset) + 5]);
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
            .attr("height", function (d) { return h - yScale(d); })
            .attr("fill", "#6c7a89");
    }

    function UpdateSort() {
        //check sort status
        if(sort == "ascending"){
            svg.selectAll("rect")
            //sort the bars in descending order
            .sort(function(a, b){
                return d3.descending(a, b);
            })
            .transition()
            .duration(500)
            .attr("x", function(d, i){
                return xScale(i);
            })
            sort = "descending";
        } 
        else {
            svg.selectAll("rect")
            .sort(function(a, b){
                //sort the bars in ascending order
                return d3.ascending(a, b);
            })
            .transition()
            .duration(500)
            .attr("x", function(d, i){
                return xScale(i);
            })
            sort = "ascending"; //change sort status
        }
    }
}

window.onload = init;