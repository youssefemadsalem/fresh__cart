import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeforgetComponent } from './codeforget.component';

describe('CodeforgetComponent', () => {
  let component: CodeforgetComponent;
  let fixture: ComponentFixture<CodeforgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeforgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeforgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
