import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export const setUpSwagger = (app: INestApplication): void => {

  const option: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('nest boiler template')
    .setDescription('nest boiler template')
    .setVersion('0.0')
    .addTag('template')
    .addBearerAuth()
    .build();

  const documnet = SwaggerModule.createDocument(app, option);

  SwaggerModule.setup('docs', app, documnet);
}