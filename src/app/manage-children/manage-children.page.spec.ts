import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageChildrenPage } from './manage-children.page';

describe('ManageChildrenPage', () => {
  let component: ManageChildrenPage;
  let fixture: ComponentFixture<ManageChildrenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChildrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
