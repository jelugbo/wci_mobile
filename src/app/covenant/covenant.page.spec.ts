import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CovenantPage } from './covenant.page';

describe('CovenantPage', () => {
  let component: CovenantPage;
  let fixture: ComponentFixture<CovenantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovenantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CovenantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
