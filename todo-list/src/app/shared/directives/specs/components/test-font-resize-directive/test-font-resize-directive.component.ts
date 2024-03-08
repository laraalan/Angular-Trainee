import { FontWeightResizerDirective } from './../../../fontWeigthResizer.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FontWeightResizerDirective],
  template : `<h2 fontWeightResizer="bold">Test Directive</h2>`

})
export class TestFontResizeDirectiveComponent {
  
}
