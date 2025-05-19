/** @notice Library imports */
import { NestFactory } from "@nestjs/core";
/// Local imports
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT!);
}
bootstrap();
