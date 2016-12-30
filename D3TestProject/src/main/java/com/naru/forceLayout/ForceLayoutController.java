package com.naru.forceLayout;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/forceLayout")
public class ForceLayoutController {
	
	@RequestMapping("index.do")
	public ModelAndView index(){
		return new ModelAndView("forceLayout/index");
	}
	
	
}
