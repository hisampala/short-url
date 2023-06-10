import { Module, Scope } from '@nestjs/common';
import { ServiceProxy } from '../../contants/service';
import { DbContextService, ShortUrlService } from '../../service';
import { ConfigModule } from '@nestjs/config';
import { validEnv } from '../../validate';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate: validEnv })],
  providers: [
    {
      provide: ServiceProxy.context,
      useClass: DbContextService,
    },
    {
      provide: ServiceProxy.short_url,
      useClass: ShortUrlService,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [ServiceProxy.context, ServiceProxy.short_url],
})
export class ShortUrlModule {}
