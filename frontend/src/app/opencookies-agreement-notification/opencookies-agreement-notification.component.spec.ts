import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencookiesAgreementNotificationComponent } from './opencookies-agreement-notification.component';

describe('OpencookiesAgreementNotificationComponent', () => {
  let component: OpencookiesAgreementNotificationComponent;
  let fixture: ComponentFixture<OpencookiesAgreementNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpencookiesAgreementNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpencookiesAgreementNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
