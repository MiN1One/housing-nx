import { FactoryService } from '@MiN1One/api-factory';
import { Injectable } from '@nestjs/common';
import { ApartmentUtilityDocument } from './apartment-utility.schema';
import { IApartmentUtility } from '@MiN1One/interfaces';

@Injectable()
export class ApartmentUtilityService {
  constructor(
    private readonly factoryService: FactoryService<ApartmentUtilityDocument>
  ) {}

  getAllApartmentUtilities(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getSingleApartmentUtility(utilityId: string) {
    return this.factoryService.getDocument(utilityId);
  }

  updateApartmentUtility(utilityId: string, update: IApartmentUtility) {
    return this.factoryService.updateDocument(utilityId, update);
  }

  deleteApartmentUtility(utilityId: string) {
    return this.factoryService.deleteDocument(utilityId);
  }

  createApartmentUtility(utility: IApartmentUtility) {
    return this.factoryService.createDocument(utility);
  }
}
