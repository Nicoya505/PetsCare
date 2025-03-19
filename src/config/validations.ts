import * as Joi from 'joi';


export const databaseValidation = Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
});

export const validationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
}).concat(databaseValidation);