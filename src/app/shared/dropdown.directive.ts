import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({selector: '[appDropdown]'})

export class DropdownDirective {
  @HostBinding('class.open') isOpen: Boolean = false;

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}

