import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.route";
import { CoreModule } from "./helper/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { StoreService } from "./helper/service/store.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { SurveyReducer } from "./helper/state-management/reducer/survey.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CoreModule.forRoot(),
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      survey: SurveyReducer,
    })
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
