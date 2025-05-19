/** @notice Library imports */
import { NestFactory } from "@nestjs/core";
/// Local imports
import { AppModule } from "./application";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
