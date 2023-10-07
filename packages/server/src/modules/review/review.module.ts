import { FactoryModule } from '@MiN1One/api-factory';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review, ReviewDocument, ReviewSchema } from './review.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { appConfigLoader } from '../app/app.config';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ReviewDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          {
            name: Review.name,
            schema: ReviewSchema,
          },
        ]),
      ],
      inject: [getModelToken(Review.name), appConfigLoader.KEY],
    }),
  ],
})
export class ReviewModule {}
