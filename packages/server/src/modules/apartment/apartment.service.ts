import { FactoryService } from '@MiN1One/api-factory';
import { Injectable } from '@nestjs/common';
import { ApartmentDocument } from './apartment.schema';
import { IApartment } from '@MiN1One/interfaces';

@Injectable()
export class ApartmentService {
  constructor(
    private readonly factoryService: FactoryService<ApartmentDocument>
  ) {}

  getAllApartments(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getApartment(apartmentId: string) {
    return this.factoryService.getDocument(apartmentId);
  }

  deleteApartment(apartmentId: string) {
    return this.factoryService.deleteDocument(apartmentId);
  }

  updateApartment<IApartment>(apartmentId: string, update: IApartment) {
    return this.factoryService.updateDocument(apartmentId, update);
  }

  createApartment(apartment: IApartment) {
    return this.factoryService.createDocument(apartment);
  }
}
