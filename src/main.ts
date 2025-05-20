/** @notice Library imports */
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
/// Local imports
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT!);
}
bootstrap();
