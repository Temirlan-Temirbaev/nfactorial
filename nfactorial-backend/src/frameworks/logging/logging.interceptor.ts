import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    this.logger.log(
      `Request ${method} ${url}`,
      'HTTP',
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          this.logger.log(
            `Response ${method} ${url} ${response.statusCode} - ${Date.now() - now}ms`,
            'HTTP',
          );
        },
        error: (error) => {
          const response = context.switchToHttp().getResponse();
          this.logger.error(
            `Response ${method} ${url} ${response.statusCode} - ${Date.now() - now}ms`,
            error.stack,
            'HTTP',
          );
        },
      }),
    );
  }
}