import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePageComponent } from './handle-page.component';

describe('HandlePageComponent', () => {
  let component: HandlePageComponent;
  let fixture: ComponentFixture<HandlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandlePageComponent]
    });
    fixture = TestBed.createComponent(HandlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
