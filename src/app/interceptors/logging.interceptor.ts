import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
