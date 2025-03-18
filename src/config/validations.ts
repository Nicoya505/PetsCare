import * as Joi from 'joi';


export const validationSchema = Joi.object({
    DATABASE_HOST:Joi.string().required(),
    DATABASE_PORT:Joi.number().required(),
    DATABASE_NAME:Joi.string().required(),
    DATABASE_USERNAME:Joi.string().required(),
    DATABASE_PASSWORD:Joi.string().required(),
    PORT:Joi.number().required(),
    JWT_SECRET:Joi.string().required(),
    NODE_ENV:Joi.string().valid('development','production').default('development'),
})