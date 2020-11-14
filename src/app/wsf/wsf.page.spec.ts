import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WsfPage } from './wsf.page';

describe('WsfPage', () => {
  let component: WsfPage;
  let fixture: ComponentFixture<WsfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WsfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
