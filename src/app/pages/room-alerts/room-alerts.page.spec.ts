import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomAlertsPage } from './room-alerts.page';

describe('RoomAlertsPage', () => {
  let component: RoomAlertsPage;
  let fixture: ComponentFixture<RoomAlertsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAlertsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomAlertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
