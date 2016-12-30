package com.naru.test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/test")
public class TestController {
	
	@RequestMapping("index")
	public ModelAndView index(){
		
		return new ModelAndView("test/index");
	}
	
	@RequestMapping("getData.json")
	public @ResponseBody String getData(HttpServletRequest request) throws IOException{
		System.out.println("getData");
		String filePath = request.getSession().getServletContext().getRealPath("/WEB-INF/views/test/data.json");
		byte[] jsonData = Files.readAllBytes(Paths.get(filePath));
		///Users/ejlee/Documents/git/D3TestProject/D3TestProject/src/main/webapp/WEB-INF/views/test/data.json

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(jsonData);
		System.out.println(rootNode.toString());
		return rootNode.toString();
	}
	
	
	@RequestMapping("ajaxAbortTest.json")
	public @ResponseBody String ajaxAbort() throws InterruptedException{
		String message = "ajaxCall_Fail";
		System.out.println("ajaxAbort.......:"+ message);
		
		Thread.sleep(10000);
		message = "ajaxCall_Success";
		System.out.println("ajaxAbort.......:"+message);
		return message;
	}
	
}
