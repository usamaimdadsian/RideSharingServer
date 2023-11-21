import Joi from "joi";
import config from "@/config/config";
import { customValidators } from "@/utils";

export class DriverValidation {
  static create = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
      phoneNumber: Joi.string().required().custom(customValidators.mobile),
      email: Joi.string().required().email(),
      cnic: Joi.string().required().custom(customValidators.cnic),

      licenseNumber: Joi.string().required(),
      licenseExpiryDate: Joi.date(),
      licenseType: Joi.string(),

      emergencyContact: Joi.string(),
      drivingRecord: Joi.string()
    }),
  };

  static index = {
    query: Joi.object().keys({
      name: Joi.string(),

      sortBy: Joi.string(),
      projectBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };

  static show = {
    params: Joi.object().keys({
      driverId: Joi.string().custom(customValidators.objectId),
    }),
  };

  static update = {
    params: Joi.object().keys({
      driverId: Joi.required().custom(customValidators.objectId),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
        dateOfBirth: Joi.date(),
        phoneNumber: Joi.string().custom(customValidators.mobile),
        email: Joi.string().email(),
        cnic: Joi.string().custom(customValidators.cnic),

        licenseNumber: Joi.string(),
        licenseExpiryDate: Joi.date(),
        licenseType: Joi.string(),

        emergencyContact: Joi.string(),
        drivingRecord: Joi.string(),

        criminalRecord: Joi.string(),
        performance: Joi.number(),
        ratings: Joi.number(),
        applicationStatus: Joi.string().valid('pending', 'approved', 'rejected')
      })
      .min(1),
  };

  static delete = {
    params: Joi.object().keys({
      driverId: Joi.string().custom(customValidators.objectId),
    }),
  };
}