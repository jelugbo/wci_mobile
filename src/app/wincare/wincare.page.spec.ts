import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WincarePage } from './wincare.page';

describe('WincarePage', () => {
  let component: WincarePage;
  let fixture: ComponentFixture<WincarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WincarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WincarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
