import "@tsed/ajv";
import {ConverterService, getJsonSchema} from "@tsed/common";
import {Type} from "@tsed/core";
import {Container, GlobalProviders, InjectorService} from "@tsed/di";
import * as Ajv from "ajv";

const ajv = new Ajv({verbose: false});


const injector = new InjectorService();
injector.addProviders(new Container(GlobalProviders.entries()));

export function validate(obj: any, model: Type<any>) {
  const converterService = injector.invoke<ConverterService>(ConverterService);
  const schema = getJsonSchema(model);

  obj = converterService.deserialize(obj, model, {
    ignoreCallback: (obj: any, type: any) => type === Date, // will be obsolete in v6
    checkRequiredValue: false //
  });

  const valid = ajv.validate(schema, obj);

  return {
    isValid: valid,
    errors: ajv.errors,
    data: obj
  };
}
