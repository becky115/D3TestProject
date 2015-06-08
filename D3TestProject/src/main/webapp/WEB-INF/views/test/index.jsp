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

</style>
<script type="text/javascript">
	$(document).ready(function(){
		d3Test();
		d3Test2();
	});
</script>
</head> 
<body>
	<div id="tooltip" class="hidden"><p><span id="value"></span>Sec</p></div>
	<div id="chart1" class="chartTestLayer"></div>
	<div>2222</div>
	<div id="chart2" class="chartTestLayer"></div>
</body>
</html>
