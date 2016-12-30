//d3.select(window).on('resize', resize);
//
//function resize() {
//	console.log($("#chart2"))
//	console.log("resize..........:" +graphD3Obj.svgWidth);
//	graphD3Obj.svgWidth = parseInt($("#chart2").find(".d3Graph").css("width"), 10) - (graphD3Obj.svgMargin.left + graphD3Obj.svgMargin.right);
//	graphD3Obj.svgHeight = parseInt($("#chart2").find(".d3Graph").css("height"), 10) - (graphD3Obj.svgMargin.top + graphD3Obj.svgMargin.bottom);
//	console.log($("#chart2").find(".d3Graph").css("width")+" ---- : "+ graphD3Obj.svgWidth +"-"+ graphD3Obj.svgHeight);
//	
//	graphD3Obj.xScale.range([0, graphD3Obj.svgWidth]); 
//	
//	$("#chart2").find("svg").attr("width", 300);
//	$("#chart2").find("svg").attr("height", 250);
//}


function responsivefy(svg) {
	console.log("#### responsivefy");
	console.log(svg);
	console.log(svg.node().parentNode)
	//return; 
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;
	console.log(width+"/"+ height)
    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
   svg.attr("viewBox", "0 0 " + width + " " + height)
        //.attr("perserveAspectRatio", "xMinYMid")
        svg.call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    console.log("resize." + container.attr("id"));
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
    	console.log("------:resize: "+ svg+"/"+ container.attr("id"))
        var targetWidth = parseInt(container.style("width"));
    	console.log(targetWidth);
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}
//http://www.brendansudol.com/posts/responsive-d3/
function d3Test2(){	
	var chartId = "chart2";
	//$("#"+chartId).append("<div class='d3Graph'></div>");
	
	var svgMargin =  {
		top: 20,
		right: 20,
		bottom: 30,
		left: 30
	};
	
	var url = "./getData.json";
	d3.json(url, function(error, jsonData){
		//console.log(jsonData)
		var rsList = jsonData;//JSON.parse(jsonData);
		var hits = rsList.hits;
		var total = hits.total;
		//console.log("total: "+ total)
		var hitsOfHits = hits.hits;
		var dataLength = hitsOfHits.length;
		//console.log("data count "+dataLength);
		
		var dataSet = [];
		var format = d3.time.format("%Y%m%d%H%M%S");
		var format2 = d3.time.format("%Y-%m-%d %H:%M:%S");
		$.each(hitsOfHits, function(i){
			var data = hitsOfHits[i];
			var _source = data._source;
			var report_time  = _source.report_time;
			var duration = _source.duration;

			var reportTimeStart = new Date(format.parse(report_time).getTime());
			var reportTimeEnd = new Date(format.parse(report_time).getTime());
			reportTimeEnd.setSeconds(reportTimeEnd.getSeconds()+duration);
	
			var yValue = Math.floor((Math.random())*dataLength)+1;
			var item = {"reportTimeStart":reportTimeStart, "reportTimeEnd": reportTimeEnd, "duration":duration, "yValue":yValue};
			dataSet.push(item);
		})
		
		var svgObj = graphD3Obj.graphSvgCreate(chartId, svgMargin);
		svgObj.call(responsivefy)
		
		//scale
		graphD3Obj.xScaleSet(dataSet, "reportTimeStart", "reportTimeEnd");
		graphD3Obj.yScaleSet(0, dataLength);
		
		//axis
		var xAxis = d3.svg.axis()
			.scale(graphD3Obj.xScale)
			.tickSize(-graphD3Obj.svgHeight) //***
			.tickPadding(10)
			.tickSubdivide(true)
			.orient("bottom");
		console.log(graphD3Obj.svgHeight+"/"+ graphD3Obj.svgWidth)
		var yAxis = d3.svg.axis()
					.scale(graphD3Obj.yScale)
					.tickPadding(10)
					.tickSize(-graphD3Obj.svgWidth)
					.tickSubdivide(true)
					.orient("left");

		
//		var line = d3.svg.line()
//				.interpolate("step-after")
//				.x1(function(d){graphD3Obj.xScale(d.reportTimeStart)})
//				.y1(function(d){graphD3Obj.xScale(d.yValue)})
//				.x2(function(d){graphD3Obj.xScale(d.reportTimeEnd)})
//				.y2(function(d){graphD3Obj.xScale(d.yValue)})
//				
				

		
		
		var zoom = d3.behavior.zoom().scaleExtent([1, 10])
					.x(graphD3Obj.xScale)
					.y(graphD3Obj.yScale)
					.on("zoom", function(){
						zoomedTest(svgObj, xAxis, yAxis, line)
					})

		
		var tempObj = svgObj.append("g").attr("transform", "translate(" + graphD3Obj.svgMargin.left + "," + graphD3Obj.svgMargin.top + ")")
		svgObj.call(zoom);


		
		
		
		
		//x축
		tempObj.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0,"+ graphD3Obj.svgHeight+")")
				.call(xAxis)
//		
//		//y축
//		/**/
//		svgObj.append("g")
//		.attr("class", "y axis")
//		//.attr("transform", "translate("+0+", 0)")
//		.call(yAxis)
//		
//		
		var toolTipDiv = d3.select("body")
						.append("div") 
						.attr("class", "tooltip")
						
		//line draw
		tempObj.append("g").selectAll("line")
			.data(dataSet)
			.enter()
			.append("line")
			.attr("x1", function(d){
			//console.log(d)
			return graphD3Obj.xScale(d.reportTimeStart);
		})
		.attr("y1", function(d){
			return graphD3Obj.yScale(d.yValue);
		})
		.attr("x2",  function(d, i){
			return graphD3Obj.xScale(d.reportTimeEnd);
		})
		.attr("y2", function(d){
			return graphD3Obj.yScale(d.yValue);
		})
		.attr("stroke-width", 3)
		.attr("stroke", "black")
		.on("mouseover", function(d){
			toolTipDiv.html(d.duration)
					.transition()
					.duration(500)
					.style("opacity", 0.9)
					.style("display", "block")
		})
		.on("mousemove", function(){
			toolTipDiv.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY - 15) + "px")
		})
		.on("mouseout", function(){
			toolTipDiv.transition()
					.duration(500)
					.style("opacity", 0)
					.style("display", "none")
		});
		
		
			
		//rect draw - x1 막대
		tempObj.append("g").selectAll("rect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("x" , function(d){
				return graphD3Obj.xScale(d.reportTimeStart);
			})
			.attr("y" , function(d){
				return graphD3Obj.yScale(d.yValue)-5;
			})
			.attr("width" , function(d) {
				return 1;
			})
			.attr("height" , function(d) {
				return 10;
			})
			.on("mouseover", function(d){
				toolTipDiv.html(d.duration)
						.transition()
						.duration(500)
						.style("opacity", 0.9)
						.style("display", "block")
			})
			.on("mousemove", function(){
				toolTipDiv.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 15) + "px")
			})
			.on("mouseout", function(){
				toolTipDiv.transition()
						.duration(500)
						.style("opacity", 0)
						.style("display", "none")
			});
		
		//rect draw - x2 막대
		tempObj.append("g").selectAll("rect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("x" , function(d){
				return graphD3Obj.xScale(d.reportTimeEnd);
			})
			.attr("y" , function(d){
				return graphD3Obj.yScale(d.yValue)-5;
			})
			.attr("width" , function(d) {
				return 1;
			})
			.attr("height" , function(d) {
				return 10;
			})
			.on("mouseover", function(d){
				toolTipDiv.html(d.duration)
						.transition()
						.duration(500)
						.style("opacity", 0.9)
						.style("display", "block")
			})
			.on("mousemove", function(){
				toolTipDiv.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 15) + "px")
			})
			.on("mouseout", function(){
				toolTipDiv.transition()
						.duration(500)
						.style("opacity", 0)
						.style("display", "none")
			});
		
		//x축 label text
//		tempObj.append("g")
//			.attr("class", "x axis")
//			.attr("transform", "translate(0," + graphD3Obj.svgHeight + ")")
//			.call(xAxis)
//			.append("text")
//			.attr("class", "label")
//			.attr("x", graphD3Obj.svgWidth)
//			.attr("y", -10)
//			.style("text-anchor", "end")
//			.text("duration"); 
			
		//y축 label text
		/*
		tempObj.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("x", 0)
			.attr("y", 15)
			//.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("y label")
		*/
		
		//x축 GRID	
//		tempObj.append("g")
//				.attr("class", "grid")
//				.attr("transform", "translate(0," + graphD3Obj.svgHeight + ")")
//				.call(d3.svg.axis()
//					.scale(graphD3Obj.xScale)
//					.orient("bottom")
//					.tickSize(-graphD3Obj.svgHeight, 0, 0)
//					.tickFormat("")
//				)
		
	})
}
function test(){
	console.log("@@@")
}

function zoomedTest(svgObj, xAxis, yAxis, line){
	console.log("@@@@ ZOOMED:  ")
	console.log(svgObj.select(".x.axis"))
	svgObj.select(".x.axis").call(xAxis);
//	svgObj.select(".y.axis").call(yAxis);
	//svgObj.select("path.line").attr("d", line);
	
	//svgObj.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


//todo data call
//d3.json(url, callback)
var ajaxObj;
function ajaxAbortTest(){
	console.log("ajaxAbortTest.........")
	var url = "ajaxAbortTest.json";
	ajaxObj = $.ajax({
		url: url,
		dataType: 'text',
		contentType: "application/json"
	})
		.done(function(data){
			console.log("done: ");
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		})
		.complete(function(){
			console.log("complete")
		})
	
}

function ajaxCallAbort(){
	ajaxObj.abort();
	console.log("cancel ajaxCall")
}