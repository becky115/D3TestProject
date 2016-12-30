var xAxis2;
var yAxis2;
var svgObj2;
function d3Test2(){
	var width = 460;
	var height = 360;
	var x = d3.scale.linear()
				.domain([0, 30]) 
				.range([0, width]);
	var y = d3.scale.linear()
				.domain([10, 20])
				.range([height, 0])

	
	xAxis2 = d3.svg.axis()
				.scale(x)
				.tickSize(-height) //***
				.tickPadding(10)
				.tickSubdivide(true)
				.orient("bottom");
	console.log("2")
	yAxis2 = d3.svg.axis()
				.scale(y)
				.tickPadding(10)
				.tickSize(-width)
				.tickSubdivide(true)
				.orient("left");
	console.log("3")
	
	
	var zoom = d3.behavior.zoom()
			.x(x)
			.y(y)
			.scaleExtent([1, 5])
			.on("zoom", zoomedTest)
			
	svgObj2 = d3.select("#chart2").append("svg")
			.call(zoom)
				.attr("width", 500)
				.attr("height", 400)
				.append("g")
				.attr("transform", "translate(" + 30 + "," + 20 + ")")
				
	
	

	//x축
	svgObj2.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0,"+ height+")")
	.call(xAxis2);
}

function zoomedTest(){//(svgObj, xAxis, yAxis){
	console.log("@@@@ ZOOMED:  "	)
	svgObj2.select(".x.axis").call(xAxis2);
	svgObj2.select(".y.axis").call(yAxis2);
	
	//svgObj.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
