package com.mundose.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@SpringBootApplication
public class DemoApplication {
    @RequestMapping("/")
    String index() {
        return "Hello World!";
    }
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
