import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PastorPage } from './pastor.page';

describe('PastorPage', () => {
  let component: PastorPage;
  let fixture: ComponentFixture<PastorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PastorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
