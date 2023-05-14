import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPageComponent } from './end-page.component';

describe('EndPageComponent', () => {
  let component: EndPageComponent;
  let fixture: ComponentFixture<EndPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndPageComponent]
    });
    fixture = TestBed.createComponent(EndPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
