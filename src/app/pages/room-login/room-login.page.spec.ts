import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomLoginPage } from './room-login.page';

describe('RoomLoginPage', () => {
  let component: RoomLoginPage;
  let fixture: ComponentFixture<RoomLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
