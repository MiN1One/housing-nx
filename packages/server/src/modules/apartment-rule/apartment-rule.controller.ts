import { APARTMENT_RULE_ROUTES, IApartmentRule } from '@MiN1One/interfaces';
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
import { ApartmentRuleService } from './apartment-rule.service';

@Controller(APARTMENT_RULE_ROUTES.ROOT)
export class ApartmentRuleController {
  constructor(readonly apartmentRuleService: ApartmentRuleService) {}

  @Get()
  getAllApartmentRules(@Query() query: Record<string, any> = {}) {
    return this.apartmentRuleService.getAllApartmentRules(query);
  }

  @Get(APARTMENT_RULE_ROUTES.SINGLE_RULE)
  getApartmentRule(@Param('apartmentRuleId') apartmentRuleId: string) {
    return this.apartmentRuleService.getSingleApartmentRule(apartmentRuleId);
  }

  @Patch(APARTMENT_RULE_ROUTES.SINGLE_RULE)
  updateApartmentRule(
    @Param('apartmentRuleId') apartmentRuleId: string,
    @Body('apartmentRule') apartmentRuleUpdate: IApartmentRule
  ) {
    return this.apartmentRuleService.updateApartmentRule(
      apartmentRuleId,
      apartmentRuleUpdate
    );
  }

  @Delete(APARTMENT_RULE_ROUTES.SINGLE_RULE)
  deleteApartmentRule(@Param('apartmentRuleId') apartmentRuleId: string) {
    return this.apartmentRuleService.deleteApartmentRule(apartmentRuleId);
  }

  @Post()
  createApartmentRule(@Body('apartmentRule') apartmentRule: IApartmentRule) {
    return this.apartmentRuleService.createApartmentRule(apartmentRule);
  }
}
