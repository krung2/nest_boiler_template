import { ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { EnviromentVariables } from "./env";

export const validate = (config: Record<string, unknown>): EnviromentVariables => {

  const validateConfig: EnviromentVariables = plainToClass(
    EnviromentVariables,
    config,
    { enableImplicitConversion: true }
  );

  const errors: ValidationError[] = validateSync(validateConfig, { skipMissingProperties: false });

  if (errors.length === 0) {

    return validateConfig;
  }

  throw new Error(errors.toString());
}