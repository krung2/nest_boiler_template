import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, Type, ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { EnviromentVariables } from "src/config/env";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {

    const { metatype }: ArgumentMetadata = metadata;

    if (!metatype || !this.toValidate(metatype)) {

      return value;
    }

    const object = plainToClass(metatype, value);
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {

      throw new BadRequestException('검증 오류');
    }

    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}