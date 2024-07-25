import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseAdminService } from '../firebase.auth.service';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {


  constructor(private readonly firebaseAuthService: FirebaseAdminService) {
    super();
  }

  private extractTokenFromHeader(request: any): string | null {
    if (request.headers && request.headers.authorization) {
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer === 'Bearer' && token) {
        return token;
      }
    }
    return null;
  }

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const decodedToken = await this.firebaseAuthService.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      if (error.message.includes('Firebase ID token has expired')) {
        throw new UnauthorizedException('token has expired. Please refresh your token and try again.');
      }
      throw new UnauthorizedException('Unauthorized access');
    }
  }


  // The handleRequest method handles the result of the authentication process
  handleRequest(err, user, info) {
    // If there's an error or the user is not authenticated, throw an UnauthorizedException
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }
    // If authentication is successful, return the user object
    return user;
  }
}
