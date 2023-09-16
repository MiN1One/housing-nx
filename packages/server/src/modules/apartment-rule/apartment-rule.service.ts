import { FactoryService } from '@MiN1One/api-factory';
import { Injectable } from '@nestjs/common';
import { ApartmentRuleDocument } from './apartment-rule.schema';
import { IApartmentRule } from '@MiN1One/interfaces';

@Injectable()
export class ApartmentRuleService {
  constructor(
    private readonly factoryService: FactoryService<ApartmentRuleDocument>
  ) {}

  getAllApartmentRules(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getSingleApartmentRule(ruleId: string) {
    return this.factoryService.getDocument(ruleId);
  }

  updateApartmentRule(ruleId: string, update: IApartmentRule) {
    return this.factoryService.updateDocument(ruleId, update);
  }

  deleteApartmentRule(ruleId: string) {
    return this.factoryService.deleteDocument(ruleId);
  }

  createApartmentRule(rule: IApartmentRule) {
    return this.factoryService.createDocument(rule);
  }
}
