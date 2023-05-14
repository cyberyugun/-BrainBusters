import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPageComponent } from './normal-page.component';

describe('NormalPageComponent', () => {
  let component: NormalPageComponent;
  let fixture: ComponentFixture<NormalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalPageComponent]
    });
    fixture = TestBed.createComponent(NormalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
