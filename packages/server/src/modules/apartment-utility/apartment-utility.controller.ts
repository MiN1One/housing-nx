import {
  APARTMENT_UTILITY_ROUTES,
  IApartmentUtility,
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
import { ApartmentUtilityService } from './apartment-utility.service';

@Controller(APARTMENT_UTILITY_ROUTES.ROOT)
export class ApartmentUtilityController {
  constructor(readonly apartmentUtilityService: ApartmentUtilityService) {}

  @Get()
  getAllApartmentUtilitys(@Query() query: Record<string, any> = {}) {
    return this.apartmentUtilityService.getAllApartmentUtilities(query);
  }

  @Get(APARTMENT_UTILITY_ROUTES.SINGLE_UTILITY)
  getApartmentUtility(@Param('apartmentUtilityId') apartmentUtilityId: string) {
    return this.apartmentUtilityService.getSingleApartmentUtility(
      apartmentUtilityId
    );
  }

  @Patch(APARTMENT_UTILITY_ROUTES.SINGLE_UTILITY)
  updateApartmentUtility(
    @Param('apartmentUtilityId') apartmentUtilityId: string,
    @Body('apartmentUtility') apartmentUtilityUpdate: IApartmentUtility
  ) {
    return this.apartmentUtilityService.updateApartmentUtility(
      apartmentUtilityId,
      apartmentUtilityUpdate
    );
  }

  @Delete(APARTMENT_UTILITY_ROUTES.SINGLE_UTILITY)
  deleteApartmentUtility(
    @Param('apartmentUtilityId') apartmentUtilityId: string
  ) {
    return this.apartmentUtilityService.deleteApartmentUtility(
      apartmentUtilityId
    );
  }

  @Post()
  createApartmentUtility(
    @Body('apartmentUtility') apartmentUtility: IApartmentUtility
  ) {
    return this.apartmentUtilityService.createApartmentUtility(
      apartmentUtility
    );
  }
}
