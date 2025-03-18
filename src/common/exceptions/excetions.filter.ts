import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';

    // Si es un error de base de datos de TypeORM, obtenemos el mensaje directamente
    if (exception instanceof QueryFailedError) {
      message = exception.message; // Aquí simplemente usamos el mensaje del error de la base de datos
    } else if (exception instanceof HttpException) {
      // Si la respuesta es un objeto, lo convertimos a string
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('message')) {
        message = exceptionResponse['message']; // Aseguramos que tomamos la propiedad message del objeto
      } else {
        message = JSON.stringify(exceptionResponse); // Si es un objeto que no tiene un campo message, lo convertimos a string
      }
    }

    // Formato de respuesta de error
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
