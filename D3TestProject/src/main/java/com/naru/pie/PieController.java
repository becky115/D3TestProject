package com.naru.pie;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/pie")
public class PieController {
	
	@RequestMapping("index.do")
	public ModelAndView index(){
		return new ModelAndView("pie/index");
	}
	
	
}
