import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertDetailsPage } from './alert-details.page';

describe('AlertDetailsPage', () => {
  let component: AlertDetailsPage;
  let fixture: ComponentFixture<AlertDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
