import { FactoryService } from '@MiN1One/api-factory';
import { Injectable } from '@nestjs/common';
import { ApartmentFacilityDocument } from './apartment-facility.schema';
import { IApartmentFacility } from '@MiN1One/interfaces';

@Injectable()
export class ApartmentFacilityService {
  constructor(
    private readonly factoryService: FactoryService<ApartmentFacilityDocument>
  ) {}

  getAllApartmentFacilities(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getSingleApartmentfacility(facilityId: string) {
    return this.factoryService.getDocument(facilityId);
  }

  updateApartmentFacility(facilityId: string, update: IApartmentFacility) {
    return this.factoryService.updateDocument(facilityId, update);
  }

  deleteApartmentFacility(facilityId: string) {
    return this.factoryService.deleteDocument(facilityId);
  }

  createApartmentFacility(facility: IApartmentFacility) {
    return this.factoryService.createDocument(facility);
  }
}
