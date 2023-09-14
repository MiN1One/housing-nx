import {
  Controller,
  Query,
  Param,
  Patch,
  Delete,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { APARTMENT_ROUTES, IApartment } from '@MiN1One/interfaces';
import { ApartmentService } from './apartment.service';

@Controller(APARTMENT_ROUTES.ROOT)
export class ApartmentController {
  constructor(readonly apartmentService: ApartmentService) {}

  @Get()
  getAllApartments(@Query() query: Record<string, any> = {}) {
    return this.apartmentService.getAllApartments(query);
  }

  @Get(APARTMENT_ROUTES.SINGLE_APARTMENT)
  getApartment(@Param('apartmentId') apartmentId: string) {
    return this.apartmentService.getApartment(apartmentId);
  }

  @Patch(APARTMENT_ROUTES.SINGLE_APARTMENT)
  updateApartment(
    @Param('apartmentId') apartmentId: string,
    @Body('apartment') apartmentUpdate: IApartment
  ) {
    return this.apartmentService.updateApartment(apartmentId, apartmentUpdate);
  }

  @Delete(APARTMENT_ROUTES.SINGLE_APARTMENT)
  deleteApartment(@Param('apartmentId') apartmentId: string) {
    return this.apartmentService.deleteApartment(apartmentId);
  }

  @Post()
  createApartment(@Body('apartment') apartment: IApartment) {
    return this.apartmentService.createApartment(apartment);
  }
}
