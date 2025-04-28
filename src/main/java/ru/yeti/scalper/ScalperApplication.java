package ru.yeti.scalper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.ClassPathResource;
import ru.yeti.scalper.sevices.YandexDiskService;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class ScalperApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScalperApplication.class, args);
	}

// TODO: 24.04.2025 спрятать это в тесты
//	public static void main(String[] args) throws IOException
//	{
//		ConfigurableApplicationContext context = SpringApplication.run(ScalperApplication.class);
//
//		YandexDiskService yandexDiskService = context.getBean(YandexDiskService.class);
//
//		InputStream is = new FileInputStream("/home/perminovrp/2/auto.jpg");
//		yandexDiskService.upload(is, "scalperTest/auto.jpg");
//
//		SpringApplication.run(ScalperApplication.class, args);
//	}
}

// TODO: 24.04.2025 План разработки.
/*
( ) Разработать модель
	( ) Информация об активе.
		( ) сделки открытые вверх
		( ) сделки открытые вниз
		( ) история закрытых сделок
		( ) статистика.
 */