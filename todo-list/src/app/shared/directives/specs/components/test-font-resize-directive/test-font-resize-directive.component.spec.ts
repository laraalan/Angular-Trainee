import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFontResizeDirectiveComponent } from './test-font-resize-directive.component';
import { FontWeightResizerDirective } from '../../../fontWeigthResizer.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TestFontResizeDirectiveComponent', () => {
  let component: TestFontResizeDirectiveComponent;
  let fixture: ComponentFixture<TestFontResizeDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFontResizeDirectiveComponent, FontWeightResizerDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(TestFontResizeDirectiveComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should font-weight to be bold', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;

    expect(fontWeight).toEqual('bold');
  });
});
