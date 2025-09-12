import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const directUri = process.env.TASK_APP_MONGO_URI;
        if (
          directUri &&
          typeof directUri === 'string' &&
          directUri.startsWith('mongodb')
        ) {
          return {
            uri: directUri,
            retryAttempts: 5,
            retryDelay: 3000,
          };
        }

        const host = process.env.MONGO_HOST ?? 'localhost';
        const port = process.env.MONGO_PORT ?? '27017';
        const database = process.env.MONGO_INITDB_DATABASE ?? 'task_db';
        const uri = `mongodb://${host}:${port}/${database}`;

        return {
          uri,
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
