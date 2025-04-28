import { Injectable, LoggerService } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  log(message: string, context?: string): void {
    this.logger.info(message, { context: context || 'Application' });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context: context || 'Application' });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context: context || 'Application' });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context: context || 'Application' });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context: context || 'Application' });
  }
}