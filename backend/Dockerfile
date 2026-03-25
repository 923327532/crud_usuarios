FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Build JAR en Docker
COPY backend/pom.xml ./
COPY backend/src ./src
RUN apk add --no-cache maven openjdk21 && \
    mvn clean package -DskipTests && \
    mv backend/target/*.jar app.jar

EXPOSE ${PORT:-8080}
CMD ["java", "-jar", "app.jar"]