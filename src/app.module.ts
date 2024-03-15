import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '@src/auth/auth.module';
import { AccountModule } from '@src/account/account.module';
import { ActivityModule } from '@src/activity/activity.module';
import { LocationModule } from '@src/location/location.module';
import { RouteModule } from '@src/route/route.module';

@Module({
  imports: [
    AuthModule,
    AccountModule,
    ActivityModule,
    LocationModule,
    RouteModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [AccountModule, ActivityModule, LocationModule, RouteModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
