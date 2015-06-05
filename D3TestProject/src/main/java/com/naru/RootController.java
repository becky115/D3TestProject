package com.naru;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RootController {
	private static final Logger logger = LoggerFactory.getLogger(RootController.class);
	
	@RequestMapping("/")
	public String home(ModelMap map) {
		logger.debug("home test");
		return "index";
	}
	
}
