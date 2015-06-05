package com.naru.test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

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
	public @ResponseBody String getData() throws IOException{
		System.out.println("getData");
		
		byte[] jsonData = Files.readAllBytes(Paths.get("/Users/ejlee/Documents/workspace/D3TestProject/src/main/webapp/WEB-INF/views/test/data.json"));

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(jsonData);

		return rootNode.toString();
	}
	
}
