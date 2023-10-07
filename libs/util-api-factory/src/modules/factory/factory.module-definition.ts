import { ConfigurableModuleBuilder } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAppConfig } from '@MiN1One/interfaces';

export interface FactoryModuleOptions<DocumentType = any> {
  model: Model<DocumentType>;
  appConfig: IAppConfig;
}

export const buildDynamicFactoryModule = () =>
  new ConfigurableModuleBuilder<FactoryModuleOptions>()
    .setClassMethodName('forFeature')
    .build();

export const {
  ConfigurableModuleClass: FactoryConfigurable,
  MODULE_OPTIONS_TOKEN: FACTORY_MODULE_TOKEN,
  ASYNC_OPTIONS_TYPE: FACTORY_ASYNC_OPTIONS,
} = buildDynamicFactoryModule();
