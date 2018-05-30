import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({selector: '[appDropdown]'})

export class DropdownDirective {
  @HostBinding('class.open') isOpen: Boolean = false;

  @HostListener('mouseenter') openDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') closeDropdown() {
    this.isOpen = !this.isOpen;
  }
}

