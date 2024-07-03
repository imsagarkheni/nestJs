// src/common/middleware/logging.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, headers } = req;
    this.logger.log(`Request ${method} ${originalUrl}`);
    // this.logger.log(`Request Headers: ${JSON.stringify(headers)}`);
    // this.logger.log(`Request Body: ${JSON.stringify(body)}`);
    next();
  }
}
