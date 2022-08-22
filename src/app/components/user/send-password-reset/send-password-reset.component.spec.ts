import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordResetComponent } from './send-password-reset.component';

describe('SendPasswordResetComponent', () => {
  let component: SendPasswordResetComponent;
  let fixture: ComponentFixture<SendPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
