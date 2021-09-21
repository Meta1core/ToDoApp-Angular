import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoriesPageComponent } from './directories-page.component';

describe('DirectoriesPageComponent', () => {
  let component: DirectoriesPageComponent;
  let fixture: ComponentFixture<DirectoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoriesPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
