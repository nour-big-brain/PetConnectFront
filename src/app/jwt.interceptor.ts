import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // ✅ match AuthService

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Token added to request");
    return next(authReq);
  } else {
    console.log("No token found");
    return next(req);
  }
};
