import { CustomHelpers } from 'joi';
import { Coordinate } from '@/modules/route/RouteInterface';

const objectId = (value: string, helpers: CustomHelpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
    }
    return value;
};

const password = (value: string, helpers: CustomHelpers) => {
    if (value.length < 8) {
        return helpers.message({ custom: 'password must be at least 8 characters' });
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message({ custom: 'password must contain at least 1 letter and 1 number' });
    }
    return value;
};
const mobile = (value: string, helpers: CustomHelpers) => {
    if (!value.match(/^\+\d{1,3}\d{7,14}$/)) {
        return helpers.message({ custom: '{{#label}} must be in the following form +XXXXXXXXXX' });
    }
    return value;
};
const cnic = (value: string, helpers: CustomHelpers) => {
    if (!value.match(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/)) {
        return helpers.message({ custom: '{{#label}} must be in following form XXXXX-XXXXXXX-X' });
    }
    return value;
};

const coordinate = (value: Coordinate, helpers: CustomHelpers<Coordinate>) => {
    const latitudeRange = { min: -90, max: 90 };
    const longitudeRange = { min: -180, max: 180 };


    if (typeof value.latitude !== 'number') {
        return helpers.message({ custom: 'Latitude value must be a number' });
    }
    if (typeof value.longitude !== 'number') {
        return helpers.message({ custom: 'Longitude value must be a number' });
    }

    if (value.latitude < latitudeRange.min || value.latitude > latitudeRange.max) {
        return helpers.message({ custom: 'Invalid latitude value' });
    }
    if (value.longitude < longitudeRange.min || value.longitude > longitudeRange.max) {
        return helpers.message({ custom: 'Invalid longitude value' });
    }

    return value;
};

const coordinateArray = (value, helpers) => {
    if (!Array.isArray(value)) {
        return helpers.message({ custom: 'Invalid coordinate array value' });
    }

    for (const point of value) {
        const validationResult = coordinate(point, helpers);
        if (validationResult !== point) {
            return validationResult;
        }
    }

    return value;
};

export default {
    objectId, password, coordinate, coordinateArray, mobile, cnic
}