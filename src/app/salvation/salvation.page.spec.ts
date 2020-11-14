import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalvationPage } from './salvation.page';

describe('SalvationPage', () => {
  let component: SalvationPage;
  let fixture: ComponentFixture<SalvationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalvationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
