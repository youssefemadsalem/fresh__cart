import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlidComponent } from './wlid.component';

describe('WlidComponent', () => {
  let component: WlidComponent;
  let fixture: ComponentFixture<WlidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WlidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WlidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
