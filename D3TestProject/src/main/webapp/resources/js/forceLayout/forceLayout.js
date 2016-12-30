
function test(){
	var nodesTest = [];
	var linksTest = [];
	
	d3.csv("../resources/js/forceLayout/test.csv", function(error, data){
//		console.log(data)
//		var dataTemp = d3.csv.parse(data);
//		console.log("--")
//		console.log(dataTemp)
		data.forEach(function(d){
			//console.log(d);

		})
		var dataObj = d3.nest()
			.key(function(d){ return d.dst_ip})
			.entries(data)
		console.log(dataObj);
		

		dataObj.forEach(function(d, i) {
			var key = d.key;
			var values = d.values;
			nodesTest.push({"ip":key, "group":(i+1)});
			
			values.forEach(function(d){
				var src_ip = d.src_ip;
				nodesTest.push({"ip":d.src_ip, "group":0});
				
				
				var source = nodesTest.length-1;
				var target = i;
				var value = null;
				
				linksTest.push({"source":source, "target":i});

			});
		});
		console.log("finish")
		console.log(nodesTest)
		console.log("linksTest::: ");
		console.log(linksTest);
		
		
		var w = 500;
		var h = 400;
		var color = d3.scale.category20();
		
		var nodes = [{
			"ip":"172.16.113.205", "group":1
		},{
			"ip":"172.16.115.230", "group":2
		},{
			"ip":"192.168.111.15", "group":3
		}];
		
		var links = [{
			"source":0, "target":0, "value":5
		},{
			"source":1, "target":2, "value":10
		},{
			"source":1, "target":0, "value":1
		}];

		
		//
//		nodes = nodesTest;
//		links = linksTest;
		
		console.log("@@@" + typeof(nodes)+ typeof(nodesTest))
		console.log(nodes)
		
		
		var svg = d3.select("body").append("svg")
		 .attr("width", w)
		 .attr("height", h);

		var force = d3.layout.force()
					.nodes(nodes)
					.links(links)
					.size([w, h])
//					.linkStrength(0.9)
//					.friction(0.9)
					.linkDistance(60)
					.charge(-100)
//					.gravity(0.1)
//					.theta(0.5)
//					.alpha(0.1)
					.start();
	
		 var link = svg.selectAll(".link").data(links).enter()
		.append("line")
		.attr("class", "link")
		.style("stroke-width", 1);//Math.sqrt(d.value);
		 
		
		 var node = svg.selectAll(".node")
			.data(nodes)
			.enter().append("g")
			.attr("class", "node")
			//.on("mouseover", mouseover)
			//.on("mouseout", mouseout)
			.call(force.drag);
		
		node.append("circle")
			.attr("r", 10)
			.style("fill", function(d) { return color(d.group); })

//		 node.append("svg:title")
//			.text(function(d){ return d.ip; });
		 node.append("text")
		    .attr("dx", ".10em")
		    .attr("dy", ".10em")
		    .text(function(d) { return d.ip; });

		 force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
		
//			node.attr("cx", function(d) { return d.x; })
//			.attr("cy", function(d) { return d.y; });
//			
//			node.attr("dx", function(d) { return d.x; })
//			.attr("dy", function(d) { return d.y; });
			
//
			 node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			


			
		 });
	})
//	.row(function(d) {
////		console.log(d)
////		return {key: d.Year, value: +d.value};
//	})
//	.get(function(error, rows) { 
//		console.log(rows); 
//	});
//	.parseRow(function(d){
//		console.log(d)
//	})

	
	

}

//function mouseover() {
//	  d3.select(this).select("circle").transition()
//	      .duration(750)
//	      .attr("r", 16);
//	}
//
//function mouseout() {
//  d3.select(this).select("circle").transition()
//      .duration(750)
//      .attr("r", 8);
//}
	
	
function test2(){
	var yields = [
				  {yield: 27.00, variety: "Manchuria", year: 1931, site: "University Farm"},
				  {yield: 48.87, variety: "Manchuria", year: 1931, site: "Waseca"},
				  {yield: 27.43, variety: "Manchuria", year: 1931, site: "Morris"},
				  
				  {yield: 1.00, variety: "1", year: 1955, site: "a"}, 
				  {yield: 3.43, variety: "3", year: 1931, site: "c"},
				
				];
	var nest = d3.nest()
	.key(function(d) { return d.year; })
	.key(function(d) { return d.variety; })
		  .rollup(function(d){
//			  return d3.mean(d, function(g) {
//				  console.log(g)
//				  return g.site;
//			  })
			  })
	.entries(yields)

	console.log(nest);
}