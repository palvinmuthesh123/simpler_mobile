import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScreensPage } from './screens.page';

describe('ScreensPage', () => {
  let component: ScreensPage;
  let fixture: ComponentFixture<ScreensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
