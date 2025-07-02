function init() {
    var w = 500;
    var h = 300;
  
    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);
  
    var color = d3.scaleQuantize().range(['#f2f0f8', '#ccc9e4', '#9f99cc', '#7869b6', "#cccccc", '#5b1f95' ]);
  
    var path = d3.geoPath().projection(projection);
  
    var tooltip = d3.select("#tooltip");

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var g = svg.append("g");

    var zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", function(event) {
            g.attr('transform', event.transform); 
        });

    svg.call(zoom);

    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: d.LGA,
            unemployed: +d.unemployed
        };
    }).then(function(data) {
        d3.json("LGA_VIC.json").then(function(json) {
           
            for (var i = 0; i < data.length; i++) {
              
                var dataState = data[i].LGA;
              
                var dataValue = parseFloat(data[i].unemployed);
                
                for(var j = 0; j < json.features.length; j++){
                    var jsonState = json.features[j].properties.LGA_name;
                    if(dataState == jsonState){
                        
                        json.features[j].properties.unemployed = dataValue;
                        break;
                    }
                }
            }
           
            color.domain([d3.min(json.features, function(d) { return d.properties.unemployed; }), d3.max(json.features, function(d) { return d.properties.unemployed; })]);
  
          
            g.selectAll("path")
              .data(json.features)
              .enter()
              .append("path")
              .attr("fill", "grey") 
              .style("fill", function(d) { return color(d.properties.unemployed); })
              .attr("d", path)
              .on("mouseover", function(event, d) {
                  tooltip.transition()
                      .duration(200)
                      .style("opacity", .9);
                  tooltip.html("LGA: " + d.properties.LGA_name + "<br/>Unemployed: " + d.properties.unemployed)
                      .style("left", (event.pageX) + "px")
                      .style("top", (event.pageY - 28) + "px");
              })
              .on("mouseout", function(d) {
                  tooltip.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  
            // load file VIC_city.csv 
            d3.csv("VIC_city.csv", function (d) {
                return {
                    place: d.place, 
                    lat: +d.lat, 
                    lon: +d.lon
                };
            }).then(function(data) {
                g.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d){
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d){
                        return projection([d.lon, d.lat])[1]; 
                    })
                    .attr("r", 2)
                    .style("fill", "red")
                    .on("mouseover", function(event, d) {
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html("City: " + d.place)
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function(d) {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
  
                //text for victorian town and city
                g.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", function(d){
                    return projection([d.lon, d.lat])[0];
                })
                .attr("y", function(d){
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", "black")
                //iterate over each text svg
                .text(function(d){ 
                    return d.place;
                });
            });
        });
    });
}

window.onload = init;