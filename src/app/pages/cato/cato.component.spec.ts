import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatoComponent } from './cato.component';

describe('CatoComponent', () => {
  let component: CatoComponent;
  let fixture: ComponentFixture<CatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
