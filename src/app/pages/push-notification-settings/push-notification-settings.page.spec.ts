import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushNotificationSettingsPage } from './push-notification-settings.page';

describe('PushNotificationSettingsPage', () => {
  let component: PushNotificationSettingsPage;
  let fixture: ComponentFixture<PushNotificationSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushNotificationSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushNotificationSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
