
function d3Test(){
	var chartId = "chart1";

	var svgMargin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 50
	};

	var svgWidth = parseInt($("#"+ chartId).css("width"), 10) - (svgMargin.left + svgMargin.right);
	var svgHeight = parseInt($("#"+ chartId).css("height"), 10) - (svgMargin.top + svgMargin.bottom);
	console.log("svgWidth: "+ svgWidth+" svgHeight: "+ svgHeight);
	var parseDate = d3.time.format("%d-%b-%y").parse;

	//create svg
	var svgObj = d3.select("#"+chartId)
			.append("svg")
			.attr("width", svgWidth + (svgMargin.left + svgMargin.right))
			.attr("height", svgHeight + (svgMargin.top + svgMargin.bottom))
			.append("g")
			.attr("transform", "translate(" + svgMargin.left + "," + svgMargin.top + ")");

	//data call
	var dataSet = [
					{"key": 0, "duration":60, "date":new Date("2015-04-27 10:30:00"), "ip":"127.0.0.1" },//src_ip?:y
					{"key": 1, "duration":120, "date":new Date("2015-04-27 10:33:05"), "ip":"168.2.0.1" },
					{"key": 2, "duration":50, "date":new Date("2015-04-27 10:35:07"), "ip":"227.0.0.1" },
					{"key": 3, "duration":20, "date":new Date("2015-04-27 10:40:05"), "ip":"225.3.0.1" }
				];
	var yMinValue = d3.min(dataSet, function(d){
		return d.duration;
	});
	var yMaxValue = d3.max(dataSet, function(d){
			return d.duration;
	});
	console.log("yMinValue: "+ yMinValue+ " yMaxValue: "+ yMaxValue)

	//일반 //.scale.linear()
	//시간 //.time.scale()
	//x scale
	var xScale = d3.time.scale()
			.domain(d3.extent(dataSet, function(d){return d.date})) //[dataSet[0].date, dataSet[dataSet.length-1].date]
			.rangeRound([0, svgWidth]); // 확인... []

	//y scale
	var yScale = d3.scale.linear()//d3.scale.ordinal()
			.domain([ 0, yMaxValue ])//yMinValue
			.rangeRound([svgHeight, 0]);


	//console.log("xScale: "+ xScale(new Date("2015-04-27 10:32:00")))
	if(isNaN(xScale(new Date("2015-04-27 10:30:00")))){
		console.log("xCale is NaN: ");
		return;
	}



	//x축  시간
	var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(d3.time.minute)
			//.tickFormat(d3.time.format('%s')) -->확인
			//.ticks(5);//구분자
	//y축 duration
	var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left")



	svgObj.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," +(svgHeight) + ")")
			.call(xAxis)

	svgObj.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate("+0+",0)")//"+(-svgPadding.bottom)+
			.call(yAxis)


	//set Data
	//1.data()

	svgObj.append("g").selectAll("line")
			.data(dataSet)
			.enter()
			.append("line")
			.attr("x1", function(d){
				//console.log(d)
				return xScale(d.date);
			})
			.attr("y1", function(d){
				return yScale(d.duration);
			})
			.attr("x2",  function(d, i){
				//console.log(i+"/"+d.date);
				//console.log(i+"/"+d.date.getTime()+"/"+ d.duration);
				var dateTemp = new Date(d.date.getTime());
				dateTemp.setSeconds(dateTemp.getSeconds()+ d.duration);
				//console.log("data x2: "+ xScale(dateTemp))
				return xScale(dateTemp);
			})
			.attr("y2", function(d){
				return yScale(d.duration);
			})
			.attr("stroke-width", 2)
			.attr("stroke", "black")
			.on("mouseover", function(d){
			//	console.log(xScale.rangeBand())
				var xPosition = d3.event.pageX-30;
				var yPosition = d3.event.pageY-30;
				console.log(xPosition+"/"+ yPosition)
				d3.select("#tooltip")//.transition().duration(200)
						.style("opacity", .9)
				.style("left", xPosition+"px")
						.style("top", yPosition+"px")
						.select("#value")
						.text(d.duration);
				d3.select("#tooltip").classed("hidden", false);
			})
			.on("mouseout", function(d){
				d3.select("#tooltip").classed("hidden", true);

//				.transition()
//						.duration(500)
//						.style("opacity", 0)
			})
//
//
			svgObj.append("g").selectAll("rect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("x" , function(d){
						return xScale(d.date);
			})
			.attr("y" , function(d){
						return yScale(d.duration)-5;
			})
			.attr("width" , function(d) {
						return 2;
			})
			.attr("height" , function(d) {
				return 10;
			});

			svgObj.append("g").selectAll("rect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("x" , function(d){
				var dateTemp = new Date(d.date.getTime());
				dateTemp.setSeconds(dateTemp.getSeconds()+ d.duration);
				return xScale(dateTemp);
			})
			.attr("y" , function(d){
				return yScale(d.duration)-5;
			})
			.attr("width" , function(d) {
				return 2;
			})
			.attr("height" , function(d) {
				return 10;
			})





	svgObj.append("g")
			.attr("class", "grid")
			.attr("transform", "translate(0," + svgHeight + ")")
			.call(d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.tickSize(-svgHeight, 0, 0)
					.tickFormat("")

	)

	svgObj.append("g")
			.attr("class", "grid")
			.call( d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.tickSize(-svgWidth, 0, 0)
					.tickFormat("")
//http://www.d3noob.org/2013/01/adding-grid-lines-to-d3js-graph.html
	)


	//2.enter()
	//3.transition()
	//4.duration()
	//set Event

}

function d3Test2(){	
	var chartId = "chart2";
	var svgMargin =  {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20,
	};
	var svgObj = graphD3Obj.graphSvgCreate(chartId, svgMargin);
	
	var url = "./getData.json";
	d3.json(url, function(error, jsonData){
		console.log(jsonData)
		var rsList = jsonData;//JSON.parse(jsonData);
		var hits = rsList.hits;
		var total = hits.total;
		console.log("total: "+ total)
		var hitsOfHits = hits.hits;
		var dataLength = hitsOfHits.length;
		console.log("data count "+dataLength);
		
		var dataSet = [];
		var format = d3.time.format("%Y%m%d%H%M%S");
		var format2 = d3.time.format("%Y-%m-%d %H:%M:%S");
		$.each(hitsOfHits, function(i){
			var data = hitsOfHits[i];
			var _source = data._source;
			var report_time  = _source.report_time;
			var duration = _source.duration;
			console.log(report_time)
			
			var reportTimeStart = new Date(format.parse(report_time).getTime());
			var reportTimeEnd = new Date(format.parse(report_time).getTime());
			reportTimeEnd.setSeconds(reportTimeEnd.getSeconds()+duration);
	
			var yValue = Math.floor((Math.random())*dataLength)+1;
			console.log(yValue+" ####: "+ format2(reportTimeStart)+"/duration: "+duration+"==>"+ format2(reportTimeEnd));
		//	console.log(i+"/"+report_time+"/"+format.parse(report_time)+"/"+ duration+"/"+ yValue)
			var item = {"reportTimeStart":reportTimeStart, "reportTimeEnd": reportTimeEnd, "duration":duration, "yValue":yValue};
			dataSet.push(item);
		})

		graphD3Obj.xScaleSet(dataSet, "reportTimeStart", "reportTimeEnd");
		graphD3Obj.yScaleSet(0, dataLength);
		
		
		svgObj.append("g").selectAll("line")
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
		.attr("stroke-width", 1)
		.attr("stroke", "black")

		
		var dataMin = d3.min(dataSet, function(d){
			return d["reportTimeStart"];
		});
		
		var dataMax = d3.max(dataSet, function(d){
			return d["reportTimeEnd"];
		});
		
		//x1 막대
		svgObj.append("g").selectAll("rect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("x" , function(d){
				console.log(graphD3Obj.xScale(d.reportTimeStart)+"**"+graphD3Obj.xScale(dataMin))
				 
				
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
			});
		
		//x2 막대기 
		svgObj.append("g").selectAll("rect")
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
		
			
		var temp = d3.time.format("%Y-%m-%d %H:%M");
		
		var customTimeFormat = d3.time.format.multi([
		                                             [".%L", function(d) { return d.getMilliseconds(); }],
		                                             [":%S", function(d) { return d.getSeconds(); }],
		                                             ["%I:%M", function(d) { return d.getMinutes(); }],
		                                             ["%I %p", function(d) { return d.getHours(); }],
		                                             ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
		                                             ["%b %d", function(d) { return d.getDate() != 1; }],
		                                             ["%B", function(d) { return d.getMonth(); }],
		                                             ["%Y", function() { return true; }]
		                                           ]); 
		
		var xAxis = d3.svg.axis()
					.scale(graphD3Obj.xScale)
					.orient("bottom")
					//.ticks(d3.time.hour, 4)
					//.tickSize(-graphD3Obj.svgHeight, 0, 0)
					 //.tickFormat(customTimeFormat);
		
		var yAxis = d3.svg.axis()
					.scale(graphD3Obj.yScale)
					.orient("left");
		
		//console.log("/"+ graphD3Obj.svgWidth+"/"+ graphD3Obj.svgHeight)
		
		//x축 label text
		svgObj.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + graphD3Obj.svgHeight + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", graphD3Obj.svgWidth)
			.attr("y", -20)
			.style("text-anchor", "end")
			.text("duration");
		
		//y축 label text
//		svgObj.append("g")
//			.attr("class", "y axis")
//			.call(yAxis)
//			.append("text")
//			.attr("class", "label")
//			.attr("transform", "rotate(-90)")
//			.attr("x", 0)
//			.attr("y", 15)
//			//.attr("dy", ".71em")
//			.style("text-anchor", "end")
//			.text("testttt")

	
		
			
		//x축 GRID	
		svgObj.append("g")
				.attr("class", "grid")
				.attr("transform", "translate(0," + graphD3Obj.svgHeight + ")")
				.call(d3.svg.axis()
				.scale(graphD3Obj.xScale)
				.orient("bottom")
				.tickSize(-graphD3Obj.svgHeight, 0, 0)
//				
//				
//				
//				//.ticks(10)
				.tickFormat("")
		)
		
		
	})
}







//todo data call
//d3.json(url, callback)