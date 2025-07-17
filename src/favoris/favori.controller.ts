import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriService } from './favori.service';

@Controller('favoris')
export class FavoriController {
    constructor(private readonly service: FavoriService) {}

    @Post('add')
    add(@Body() dto: { userId: string; paysId: string }) {
        return this.service.addFavori(dto.userId, dto.paysId);
    }

    @Delete()
    remove(@Body() dto: { userId: string; paysId: string }) {
        return this.service.removeFavori(dto.userId, dto.paysId);
    }

    @Get('user/:userId')
    getUserFavoris(@Param('userId') userId: string) {
        return this.service.findByUser(userId);
    }

}
