import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadStantionsPackPageComponent } from './load-stantions-pack-page.component';

describe('LoadStantionsPackPageComponent', () => {
  let component: LoadStantionsPackPageComponent;
  let fixture: ComponentFixture<LoadStantionsPackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadStantionsPackPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadStantionsPackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
