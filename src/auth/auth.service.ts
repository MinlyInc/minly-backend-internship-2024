import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from './firebase.auth.service';

@Injectable()
export class AuthService {

    constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

    async verifyFirebaseToken(idToken: string): Promise<any> {
      return this.firebaseAdminService.verifyIdToken(idToken) ;
    }

}
