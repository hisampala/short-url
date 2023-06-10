import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { PathController } from '../../../domain/contants';
import { ServiceProxy } from '../../../domain/contants/service';
import { ShortUrlService } from '../../../domain/service';

import { Response } from 'express';
import { TCreateShortUrl } from '../../../domain/dto';

@Controller(PathController.base)
export class ShortUrlController {
  constructor(
    @Inject(ServiceProxy.short_url) private readonly service: ShortUrlService,
  ) {}
  @Post('generate')
  generateShortUrl(@Body() item: TCreateShortUrl) {
    try {
      return this.service.onCreate(item.url);
    } catch (error) {
      throw error;
    }
  }
  @Get(':code')
  async getShortUrl(@Param('code') code: string, @Res() res: Response) {
    try {
      const url = await this.service.onFindByCode(code);
      if (url) {
        res.redirect(url.original_url);
      } else {
        throw new BadRequestException(`Invalid Url`);
      }
    } catch (error) {
      throw error;
    }
  }
}
