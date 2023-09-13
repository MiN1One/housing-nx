import { Injectable } from "@nestjs/common";
import { ReviewDocument } from "./review.schema";
import { FactoryService } from "@MiN1One/api-factory";
import { IReview } from "@MiN1One/interfaces";

@Injectable()
export class ReviewService {
  constructor(
    private readonly factoryService: FactoryService<ReviewDocument>
  ) {}

  getAllReviews(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getReview(reviewId: string) {
    return this.factoryService.getDocument(reviewId);
  }

  deleteReview(reviewId: string) {
    return this.factoryService.deleteDocument(reviewId);
  }

  updateReview<IReview>(reviewId: string, update: IReview) {
    return this.factoryService.updateDocument(reviewId, update);
  }

  createReview(review: IReview) {
    return this.factoryService.createDocument(review);
  }
}