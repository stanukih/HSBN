import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryRequestPageComponent } from './password-recovery-request-page.component';

describe('PasswordRecoveryRequestPageComponent', () => {
  let component: PasswordRecoveryRequestPageComponent;
  let fixture: ComponentFixture<PasswordRecoveryRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryRequestPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
