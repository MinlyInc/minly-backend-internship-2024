import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly  authService: AuthService){}

    @Get('valid')
    @UseGuards(FirebaseAuthGuard)
    @ApiResponse({ status: 200, description: 'validate access token' })
    @ApiBearerAuth()
    isValidToken(@Req() req) {
      return { "is_valid" : true };
    }
    
}
