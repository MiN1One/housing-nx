import { IAppConfig } from '@MiN1One/interfaces';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  HydratedDocument,
  Model,
  Types,
  UpdateQuery,
} from 'mongoose';
import { ApiFeatures, throwApiException } from '../../utils/api.utils';
import {
  FACTORY_MODULE_TOKEN,
  FactoryModuleOptions,
} from './factory.module-definition';

interface ISingleDocumentOptions<T> {
  select?: keyof T;
  populate?: string[];
}

@Injectable()
export class FactoryService<D = any> {
  model: Model<HydratedDocument<any>>;
  appConfig: IAppConfig;
  modelName: string;

  constructor(
    @Inject(FACTORY_MODULE_TOKEN)
    factoryModuleOptions: FactoryModuleOptions
  ) {
    this.model = factoryModuleOptions.model;
    this.appConfig = factoryModuleOptions.appConfig;
    this.modelName = this.model.collection.name;
  }

  throwError(error: unknown, context: keyof FactoryService) {
    Logger.error(error, `FactoryService:${context}:${this.modelName}`);
    throwApiException(error, this.appConfig);
  }

  async getDocumentsByIds<T = Array<D>>(...ids: string[]) {
    try {
      const objectIds = ids.map((id) => new Types.ObjectId(id));
      const documents = await this.model.find({ _id: { $in: objectIds } });
      return documents as T;
    } catch (er) {
      this.throwError(er, 'getDocumentsByIds');
    }
  }

  async getSingleDocumentByQuery<T = D>(
    query: FilterQuery<T>,
    { select, populate }: ISingleDocumentOptions<T>
  ) {
    try {
      let mongoQuery = this.model.findOne(query);
      if (select) {
        mongoQuery = mongoQuery.select(select as string);
      }
      if (populate?.length) {
        mongoQuery = mongoQuery.populate(populate);
      }
      return await mongoQuery.exec();
    } catch (er) {
      this.throwError(er, 'getSingleDocumentByQuery');
    }
  }

  async getAllDocuments<T = Array<D>>(
    query: FilterQuery<T>,
    ...populate: string[]
  ): Promise<T[] | undefined> {
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
      return documents as T[];
    } catch (er) {
      this.throwError(er, 'getAllDocuments');
    }
  }

  async getDocument<T = D>(
    documentId: string,
    ...populate: string[]
  ): Promise<T | undefined> {
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
      this.throwError(er, 'getDocument');
    }
  }

  async updateDocument<T = D>(
    documentId: string,
    update: UpdateQuery<T>
  ): Promise<T | undefined> {
    try {
      const updatedDocument = await this.model.findByIdAndUpdate(
        documentId,
        update,
        { new: true }
      );
      return updatedDocument as T;
    } catch (er) {
      this.throwError(er, 'updateDocument');
    }
  }

  async deleteDocument(documentId: string): Promise<null | undefined> {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(documentId);
      if (!deletedDocument) {
        throw new NotFoundException('Document with this id is not found');
      }
      return null;
    } catch (er) {
      this.throwError(er, 'deleteDocument');
    }
  }

  async createDocument<T = D>(document: Partial<T>): Promise<T | undefined> {
    try {
      const createdDocument = await this.model.create(document);
      await createdDocument.save();
      return createdDocument as T;
    } catch (er) {
      this.throwError(er, 'createDocument');
    }
  }
}
