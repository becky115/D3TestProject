<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="../common/common.jsp"/>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="<c:url value='/resources/css/test/test.css'/>"></link>
<script type="text/javascript" src="<c:url value="/resources/external/jquery/jquery-2.1.4.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/external/d3/d3.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/pie/pie.js"/>"></script>
<script type="text/javascript">
	$(document).ready(function(){
		test();
	});
</script>
<style type="text/css">
svg{border:1px solid black;}


svg text {
	pointer-events: none;
	font: 10px sans-serif;
	stroke:blue;
}

</style>
</head> 
<body>
pie


</body>
</html>
