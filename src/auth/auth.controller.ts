import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import {AuthService } from './auth.service.js'

@Controller('auth')
export class AuthController {

    constructor (private AuthService: AuthService ) { }

    @Post('login')
    async login(
        @Body() data: LoginDto
    ) {
        const usertoken = await this.AuthService.validateUser(data);

        if (!usertoken) throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

        return usertoken
    }
}