import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { Config } from './config.class';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        let _jwtService = new JwtService({ secret: new Config().secret });
        if (context.switchToHttp().getRequest().headers.authorization) {
          // console.log(
          //   _jwtService.decode(
          //     context
          //       .switchToHttp()
          //       .getRequest()
          //       .headers.authorization.replace('Bearer ', ''),
          //   ),
          // );
        }
        return value;
      }),
    );
  }
}
