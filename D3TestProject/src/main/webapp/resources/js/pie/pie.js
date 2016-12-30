
function test(){
		
		
		
		var width = 960,
		height = 500,
		radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var percentageFormat = d3.format("%");

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) {
	    	console.log("---values::: ")
	    	console.log(d.values)
	        return d.values;
	    });

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


	d3.csv("../resources/js/pie/data.csv", function(error, csv_data) {
		console.log("#### ")
			console.log(csv_data)
	            var data = d3.nest()
	                .key(function(d) {
	                    return d.ip;
	                })
	                .rollup(function(d) {
	                    return d3.sum(d, function(g) {
	                        return g.value;
	                    });
	                }).entries(csv_data);

	            var tots = d3.sum(data, function(d) { 
	            	return d.values; 
	            });

	            data.forEach(function(d) {
	                d.percentage = d.values  / tots;
	            });

	console.log("data variable", data);
	console.log("pie(data)", pie(data));

	            var g = svg.selectAll(".arc")
	                .data(pie(data))
	                .enter().append("g")
	                .attr("class", "arc");

	            g.append("path")
	                .attr("d", arc)
	                .style("fill", function(d,i) {
	                    return color(i);
	                });

	            g.append("text")
	                .attr("transform", function(d) {
	                    return "translate(" + arc.centroid(d) + ")";
	                })
	                .attr("dy", ".35em")
	                .style("text-anchor", "middle")
	                .text(function(d) {
	                	console.log("d is", d);
	                    return percentageFormat(d.data.percentage);
	                });
	            });
}