import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestimonyPage } from './testimony.page';

describe('TestimonyPage', () => {
  let component: TestimonyPage;
  let fixture: ComponentFixture<TestimonyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
