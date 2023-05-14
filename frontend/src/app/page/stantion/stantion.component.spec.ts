import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StantionComponent } from './stantion.component';

describe('StantionComponent', () => {
  let component: StantionComponent;
  let fixture: ComponentFixture<StantionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StantionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
