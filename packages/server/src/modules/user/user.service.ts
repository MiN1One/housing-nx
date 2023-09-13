import { Injectable } from "@nestjs/common";
import { UserDocument } from "./user.schema";
import { FactoryService } from "@MiN1One/api-factory";
import { IUser } from "@MiN1One/interfaces";

@Injectable()
export class UserService {
  constructor(
    private readonly factoryService: FactoryService<UserDocument>
  ) {}

  getAllUsers(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getUser(userId: string) {
    return this.factoryService.getDocument(userId);
  }

  deleteUser(userId: string) {
    return this.factoryService.deleteDocument(userId);
  }

  updateUser<IUser>(userId: string, update: IUser) {
    return this.factoryService.updateDocument(userId, update);
  }

  createUser(user: IUser) {
    return this.factoryService.createDocument(user);
  }
}