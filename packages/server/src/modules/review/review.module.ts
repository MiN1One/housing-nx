import { FactoryModule } from '@MiN1One/api-factory';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review, ReviewDocument, ReviewSchema } from './review.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ReviewDocument>) => ({ model }),
      imports: [
        MongooseModule.forFeature([
          {
            name: Review.name,
            schema: ReviewSchema,
          },
        ]),
      ],
      inject: [getModelToken(Review.name)],
    }),
  ],
})
export class ReviewModule {}
