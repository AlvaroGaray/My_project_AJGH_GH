import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({ required: true, example: 'correo@algo.com' })

    email: string;

    @ApiProperty({ required: true, example: 'Steven_Doe' })

    name: string;

    username?: string;

    @ApiProperty({ required: true, example: 'password123' })

    password: string;

    @ApiProperty({ required: true, example:1, description: 'ID del tenant' })

    tenantId: string;
}
