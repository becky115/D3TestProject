package com.naru.line;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/line")
public class LineLayoutController {
	
	@RequestMapping("index.do")
	public ModelAndView index(){
		return new ModelAndView("line/index");
	}
}
