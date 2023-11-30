import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  async getGoogleUserInfo(token: string): Promise<any> {
    const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

    try {
      const response = await fetch(`${googleApiUrl}?id_token=${token}`);
      
      if (!response.ok) {
        throw new HttpException(
          {
            status: response.status,
            error: `Error retrieving Google user info - Status ${response.status}`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error retrieving Google user info - ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}