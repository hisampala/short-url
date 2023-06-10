import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Url } from '@prisma/client';
import { randomUUID } from 'crypto';
import { generate } from 'shortid';
import { ServiceProxy } from '../../contants/service';
import { DbContextService } from '../db-context/db-context.service';
import { ZReturnShortUrl } from '../../dto/return-url-short';
import { TEnv } from '../../validate';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ShortUrlService {
  logger = new Logger(ShortUrlService.name);
  constructor(
    @Inject(ServiceProxy.context)
    private readonly context: DbContextService,
    private readonly config: ConfigService<TEnv>,
  ) {}

  async onCreate(url: string) {
    try {
      this.logger.log('on Create shorturl process...');
      const urlIsExist = await this.findExistingURL(url);
      if (urlIsExist) {
        this.logger.log('Existing url ');
        const short_url = this.onGenerateShortUrl(urlIsExist.shot_code);
        return ZReturnShortUrl.parse({
          short_url: short_url,
          original_url: url,
        });
      }
      await this.checkUrl(url);
      const dataraw = this.onInitailData(new URL(url), url);
      const createUrl = await this.context.url.create({
        data: dataraw,
      });
      this.logger.log('on Create shorturl successfully');
      const short_url = this.onGenerateShortUrl(createUrl.shot_code);
      return ZReturnShortUrl.parse({
        short_url: short_url,
        original_url: url,
      });
    } catch (error) {
      this.logger.log('on Create fail');
      console.log(error);

      throw new BadRequestException(error);
    }
  }
  async checkUrl(url: string) {
    try {
      await fetch(url);
    } catch (error) {
      throw error;
    }
  }
  onInitailData(urltemp: URL, original_url: string) {
    try {
      const init_data: Url = {
        id: randomUUID(),
        protocal: urltemp.protocol,
        domain: urltemp.hostname.split('.').reverse()[0],
        hostname: urltemp.hostname,
        port: urltemp.port ? urltemp.port : '80',
        path: urltemp.pathname,
        shot_code: generate(),
        original_url: original_url,
        create_date: new Date(),
      };
      this.logger.log('on Initail data success');
      return init_data;
    } catch (error) {
      throw error;
    }
  }
  onGenerateShortUrl(shot_code: string) {
    return `${this.config.get('BASE_URL')}/${shot_code}`;
  }
  onFindByCode(code: string) {
    this.logger.log(`on find by code :${code}`);
    try {
      return this.context.url.findUnique({ where: { shot_code: code } });
    } catch (error) {
      throw error;
    }
  }
  findExistingURL(url: string) {
    return this.context.url.findFirst({ where: { original_url: url } });
  }
}
