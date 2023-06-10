import { Global, Module } from '@nestjs/common';

import { ShortUrlModule } from './short-url/short-url.module';
import { ShortUrlController } from '../../application/controllers/short-url/short-url.controller';

@Global()
@Module({
  imports: [ShortUrlModule],
  controllers: [ShortUrlController],
})
export class AppModule {}
