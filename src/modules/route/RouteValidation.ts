import Joi from "joi";
import { customValidators } from "@/utils";

export class RouteValidation {
  static create = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      distance: Joi.number().required(), // in meters
      duration: Joi.number().required(), // in seconds
      trafficCondition: Joi.string().valid("low","normal","high").default("normal"),
      roadType: Joi.string().valid("local","toll_road","highway").default("local"),
      wayPoints: Joi.custom(customValidators.coordinateArray)
    }),
  };

  static index = {
    query: Joi.object().keys({
      name: Joi.string(),
      roadType: Joi.string().valid("local","toll_road","highway"),
      trafficCondition: Joi.string().valid("low","normal","high"),


      sortBy: Joi.string(),
      projectBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };

  static show = {
    params: Joi.object().keys({
      routeId: Joi.string().custom(customValidators.objectId),
    }),
  };

  static update = {
    params: Joi.object().keys({
      routeId: Joi.required().custom(customValidators.objectId),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        distance: Joi.number().required(), // in meters
        duration: Joi.number().required(), // in seconds
        trafficCondition: Joi.string().valid("low","normal","high").default("normal"),
        roadType: Joi.string().valid("local","toll_road","highway").default("local"),
        wayPoints: Joi.array().custom(customValidators.coordinate)
      })
      .min(1),
  };

  static delete = {
    params: Joi.object().keys({
      routeId: Joi.string().custom(customValidators.objectId),
    }),
  };
}