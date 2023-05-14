import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTravelsPackPageComponent } from './load-travels-pack-page.component';

describe('LoadingTravelsPackPageComponent', () => {
  let component: LoadTravelsPackPageComponent;
  let fixture: ComponentFixture<LoadTravelsPackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadTravelsPackPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadTravelsPackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
