import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { mockProvider } from "./provider/mock.provider";
import { CommonModule } from "@angular/common";

const DataService:  Provider[] = mockProvider;

export const NB_CORE_PROVIDERS = [...DataService];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS]
    }
  }
}
