var w = 300, h = 300, padding = 55;
var dataset = [5, 10, 15, 20, 25, 30];
var outerRadius = w / 2;
var innerRadius = 0;
var isDonut = false;

function drawPieChart() {
    d3.select("#chart").select("svg").remove(); // Clear previous chart
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var arc = d3.arc()
        .innerRadius(isDonut ? innerRadius : 0)
        .outerRadius(outerRadius);
    var pie = d3.pie()
    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${outerRadius},${outerRadius})`);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    arcs.append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc);

    arcs.append("text")
        .text(d => d.value)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold");
}

window.onload = function () {
    drawPieChart();

    document.getElementById("toggleDonut").addEventListener("click", function () {
        isDonut = !isDonut;
        drawPieChart();
    });
}

window.onload = init;