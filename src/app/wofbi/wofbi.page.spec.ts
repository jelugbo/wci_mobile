import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WofbiPage } from './wofbi.page';

describe('WofbiPage', () => {
  let component: WofbiPage;
  let fixture: ComponentFixture<WofbiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WofbiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WofbiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
