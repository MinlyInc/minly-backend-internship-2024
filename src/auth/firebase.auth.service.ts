import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../config/minly-f5b4a-firebase-adminsdk-m3icz-a90a67b299.json' ;

@Injectable()
export class FirebaseAdminService {
  private readonly admin = admin;

  constructor() {
    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async verifyIdToken(idToken: string): Promise<any> {
    try {
      const decodedToken = await this.admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('Firebase ID token has expired. Please refresh your token and try again.');
      }
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  

}
