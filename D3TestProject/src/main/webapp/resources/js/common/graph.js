/**
 * D3.js
 */

var graphD3Obj = {
	svgWidth: 0,
	svgHeight: 0,
	svgMargin: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	
	xScale: null,
	yScale: null,
	
	
	svgMarginSet: function(svgMargin){
		if(svgMargin != null && svgMargin != undefined){
			this.svgMargin.top = (svgMargin.top == null || svgMargin.top == undefined || isNaN(svgMargin.top)) ? 0:svgMargin.top;
			this.svgMargin.right = (svgMargin.right == null || svgMargin.right == undefined || isNaN(svgMargin.right)) ? 0:svgMargin.right;
			this.svgMargin.bottom = (svgMargin.bottom == null || svgMargin.bottom == undefined || isNaN(svgMargin.bottom)) ? 0:svgMargin.bottom;
			this.svgMargin.left = (svgMargin.left == null || svgMargin.left == undefined || isNaN(svgMargin.left)) ? 0:svgMargin.left;
			
		}
	},

	graphSvgCreate: function(chartId, svgMargin){
		console.log("######: graphSvgCreate");
		if(chartId == null || chartId == undefined) return;
		this.svgMarginSet(svgMargin);
			
			//alert(chartId)
		console.log("svgWidth: "+ this.svgWidth+" svgHeight: "+ this.svgHeight);
//		svgObj = d3.select("#"+chartId)
//				//.attr("id", "idTest")
//				.append("svg")
//				.attr("width", this.svgWidth+this.svgMargin.left+ this.svgMargin.right)
//				.attr("height", this.svgHeight+this.svgMargin.top + this.svgMargin.bottom)
		svgObj = d3.select("#"+chartId).append("svg")
	    .attr("width", 600)
	    .attr("height", 500)
	    .call(responsivefy);
		this.svgWidth = parseInt($("#"+ chartId).css("width"), 10) - (this.svgMargin.left + this.svgMargin.right);
		this.svgHeight = parseInt($("#"+ chartId).css("height"), 10) - (this.svgMargin.top + this.svgMargin.bottom);

		return svgObj;
	},
	
	xScaleSet: function(dataSet, key1, key2){
		if(dataSet == null || dataSet == undefined){
			this.xScale = null;
			return;
		}
		if(key1 == null || key1 == undefined || key1 == ""){
			this.xScale = null;
			return;
		}
		if(key2 == null || key2 == undefined || key2 == ""){
			this.xScale = null;
			return;
		}
		var dataMin = d3.min(dataSet, function(d){
			return d[key1];
		});
		var dataMax = d3.max(dataSet, function(d){
			return d[key2];
		});
//		console.log("--------dataMin: "+ dataMin);
//		console.log("--------dataMax: "+ dataMax);
		
		this.xScale = d3.time.scale()
					.domain([new Date(dataMin.getTime()), new Date(dataMax.getTime())])
					.range([0, this.svgWidth]); 
//		console.log(this.svgWidth)
//		console.log("@#$@#$#@$: "+ this.xScale(new Date(dataMin.getTime())));
//		console.log("@#$@#$#@$: "+ this.xScale(new Date(dataMax.getTime())));
	},
	
	yScaleSet: function(yMinValue, yMaxValue){
		if(yMinValue == null || yMinValue == undefined || isNaN(yMinValue)){
			this.yScale = null;
			return;
		}
		if(yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)){
			this.yScale = null;
			return;
		}

		this.yScale = d3.scale.linear()
					.domain([yMinValue, yMaxValue])
					.range([this.svgHeight, 0]);
	}
}

