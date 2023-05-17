FROM openjdk:21-slim-buster
WORKDIR /app
COPY target/demo-0.0.1.jar /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]