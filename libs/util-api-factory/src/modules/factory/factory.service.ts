import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HydratedDocument, Model, Types, UpdateQuery } from 'mongoose';
import { ApiFeatures } from '../../utils/api.utils';
import {
  FactoryModuleOptions,
  FACTORY_MODULE_TOKEN,
} from './factory.module-definition';

@Injectable()
export class FactoryService<D = any> {
  model: Model<HydratedDocument<any>>;
  modelName: string;

  constructor(
    @Inject(FACTORY_MODULE_TOKEN)
    factoryModuleOptions: FactoryModuleOptions
  ) {
    this.model = factoryModuleOptions.model;
    this.modelName = this.model.collection.name;
  }

  async getDocumentsByIds<T = Array<D>>(...ids: string[]) {
    try {
      const objectIds = ids.map((id) => new Types.ObjectId(id));
      const documents = await this.model.find({ _id: { $in: objectIds } });
      return documents as T;
    } catch (er) {
      Logger.error(er, `FactoryService:getDocumentsByIds:${this.modelName}`);
      return [] as T;
    }
  }

  async getAllDocuments<T = Array<D>>(
    query: Record<string, any>,
    ...populate: string[]
  ): Promise<T> {
    try {
      let { mongooseQuery } = new ApiFeatures(this.model.find(), query)
        .limit()
        .project()
        .paginate()
        .filter()
        .search()
        .sort()
        .populate();

      if (populate.length) {
        mongooseQuery = mongooseQuery.populate(populate);
      }

      const documents = await mongooseQuery;
      return documents as T;
    } catch (er) {
      Logger.error(er, `FactoryService:getAllDocuments:${this.modelName}`);
      return [] as T;
    }
  }

  async getDocument<T = D>(
    documentId: string,
    ...populate: string[]
  ): Promise<T> {
    try {
      let query = this.model.findById(documentId);
      if (populate.length) {
        query = await query.populate(populate);
      }
      const document = await query;
      if (!document) {
        throw new NotFoundException('Document with this id is not found');
      }
      return document as T;
    } catch (er) {
      Logger.error(er, `FactoryService:getDocument:${this.modelName}`);
      return {} as T;
    }
  }

  async updateDocument<T = D>(
    documentId: string,
    update: UpdateQuery<T>
  ): Promise<T> {
    try {
      const updatedDocument = await this.model.findByIdAndUpdate(
        documentId,
        update,
        { new: true }
      );
      return updatedDocument as T;
    } catch (er) {
      Logger.error(er, `FactoryService:updateDocument:${this.modelName}`);
      return {} as T;
    }
  }

  async deleteDocument(documentId: string): Promise<null> {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(documentId);
      if (!deletedDocument) {
        throw new NotFoundException('Document with this id is not found');
      }
    } catch (er) {
      Logger.error(er, `FactoryService:deleteDocument:${this.modelName}`);
    }
    return null;
  }

  async createDocument<T = D>(document: T): Promise<T> {
    try {
      const createdDocument = await this.model.create(document);
      await createdDocument.save();
      return createdDocument as T;
    } catch (er) {
      Logger.error(er, `FactoryService:createDocument:${this.modelName}`);
      return {} as T;
    }
  }
}
