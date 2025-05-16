function init(){
    var w = 500;
    var h = 200;
    var barPadding = 1;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;
        barChart(wombatSightings, w, h, barPadding, svg);
    });    
}

function barChart(data, w, h, barPadding, svg) {   
    var xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.date; }))
        .range([0, w])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return + d.wombats; })])
        .range([h, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / data.length);
        })
        .attr("y", h) 
        .attr("width", w / data.length - barPadding)
        .attr("height", 0) 
        .transition() 
        .duration(800) 
        .attr("y", function(d) {
            return h - (d.wombats * 5); 
        })
        .attr("height", function(d) {
            return d.wombats * 5; 
        })
        .attr("fill", function(d) {
            return d.wombats > 10 ? "blue" : "darkblue";
        });
         svg.selectAll("rect")
       .on("mouseover", function(event, d) {
           var xPosition = event.pageX;
           var yPosition = event.pageY;
           d3.select("#tooltip")
             .style("left", xPosition + "px")
             .style("top", yPosition + "px")
             .text("Wombats: " + d.wombats)
             .style("visibility", "visible");
       })
       .on("mouseout", function() {
           d3.select("#tooltip")
             .style("visibility", "hidden");
       });
}

window.onload = init;