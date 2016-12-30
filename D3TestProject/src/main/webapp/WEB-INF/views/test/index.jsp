<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="../common/common.jsp"/>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="<c:url value='/resources/css/test/test.css'/>"></link>
<script type="text/javascript" src="<c:url value="/resources/external/jquery/jquery-2.1.4.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/external/d3/d3.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/test/test.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/common/graph.js"/>"></script>
<style type="text/css">
path.line {
  fill: none;
  stroke: #000;
  stroke-width: .5px;
}

</style>
<script type="text/javascript">
	$(document).ready(function(){
		/* d3Test();*/
		//d3Test2(); 
	});
	
	$(window).resize(function(){
	//	sizeTest();
	});
	
	function sizeTest(){
		var width = $("body").width()/3*2;
		$(".chartTestLayer").width(width);
	}
	
	function forceLayoutTest(){
		location.href = "../forceLayout/index.do"
	}
	function lineTest(){
		location.href = "../line/index.do"
	}
	function pieTest(){
		location.href = "../pie/index.do"
	}
</script>
</head> 
<body>
<!-- 
	<div id="tooltip" class="hidden"><p><span id="value"></span>Sec</p></div>
	<div id="chart1" class="chartTestLayer" style="float:left"></div>
	<div id="chart2" class="chartTestLayer" style="float:left"></div>
	<div id="chart3" style="clear:both;"></div>
	 -->
	 <div class="chartTestLayer"  style="float:left; width: auto; height:auto; border:1px solid red; padding:20px;">
	 	<div id="chart2" style=""></div>
	 </div>
	 <button onclick="ajaxAbortTest()">tt</button>
	 <button onclick="ajaxCallAbort()">cc</button>
	 
	 <button onclick="forceLayoutTest()">force</button>
	 <button onclick="lineTest()">line</button>
	 <button onclick="pieTest()">pie</button>
</body>
<script type="text/javascript">
</script>
</html>
