import Joi from "joi";
import { customValidators } from "@/utils";

export class VehicleValidation {
  static create = {
    body: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      capacity: Joi.number().required(),

      insuranceProvider: Joi.string(),
      insurancePolicyNumber: Joi.string(),
      insuranceValidFrom: Joi.date(),
      insuranceValidTo: Joi.date(),

    }),
  };

  static index = {
    query: Joi.object().keys({
      make: Joi.string(),
      model: Joi.string(),

      sortBy: Joi.string(),
      projectBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };

  static show = {
    params: Joi.object().keys({
      vehicleId: Joi.string().custom(customValidators.objectId),
    }),
  };

  static update = {
    params: Joi.object().keys({
      vehicleId: Joi.required().custom(customValidators.objectId),
    }),
    body: Joi.object()
      .keys({
        make: Joi.string(),
        model: Joi.string(),
        registrationNumber: Joi.string(),
        capacity: Joi.number(),

        insuranceProvider: Joi.string(),
        insurancePolicyNumber: Joi.string(),
        insuranceValidFrom: Joi.date(),
        insuranceValidTo: Joi.date(),
      })
      .min(1),
  };

  static delete = {
    params: Joi.object().keys({
      vehicleId: Joi.string().custom(customValidators.objectId),
    }),
  };
}