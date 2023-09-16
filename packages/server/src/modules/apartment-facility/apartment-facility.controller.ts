import {
  APARTMENT_FACILITY_ROUTES,
  IApartmentFacility,
} from '@MiN1One/interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApartmentFacilityService } from './apartment-facility.service';

@Controller(APARTMENT_FACILITY_ROUTES.ROOT)
export class ApartmentFacilityController {
  constructor(readonly apartmentService: ApartmentFacilityService) {}

  @Get()
  getAllApartmentFacilitys(@Query() query: Record<string, any> = {}) {
    return this.apartmentService.getAllApartmentFacilities(query);
  }

  @Get(APARTMENT_FACILITY_ROUTES.SINGLE_FACILITY)
  getApartmentFacility(
    @Param('apartmentFacilityId') apartmentFacilityId: string
  ) {
    return this.apartmentService.getSingleApartmentfacility(
      apartmentFacilityId
    );
  }

  @Patch(APARTMENT_FACILITY_ROUTES.SINGLE_FACILITY)
  updateApartmentFacility(
    @Param('apartmentFacilityId') apartmentFacilityId: string,
    @Body('apartment') apartmentUpdate: IApartmentFacility
  ) {
    return this.apartmentService.updateApartmentFacility(
      apartmentFacilityId,
      apartmentUpdate
    );
  }

  @Delete(APARTMENT_FACILITY_ROUTES.SINGLE_FACILITY)
  deleteApartmentFacility(
    @Param('apartmentFacilityId') apartmentFacilityId: string
  ) {
    return this.apartmentService.deleteApartmentFacility(apartmentFacilityId);
  }

  @Post()
  createApartmentFacility(@Body('apartment') apartment: IApartmentFacility) {
    return this.apartmentService.createApartmentFacility(apartment);
  }
}
