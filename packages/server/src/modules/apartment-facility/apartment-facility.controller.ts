import { APARTMENT_ROUTES } from '@MiN1One/interfaces';
import { Controller, Get } from '@nestjs/common';
import { ApartmentFacilityService } from './apartment-facility.service';

@Controller(APARTMENT_ROUTES.APARTMENT_RULES)
export class ApartmentFacilityController {
  constructor(
    private readonly apartmentFacilityService: ApartmentFacilityService,
  ) {}

  @Get()
  getAllApartmentFacilities() {
    return this.apartmentFacilityService
  }
}