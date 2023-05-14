import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zero-page',
  templateUrl: './zero-page.component.html',
  styleUrls: ['./zero-page.component.scss']
})
export class ZeroPageComponent {
  @Input() dynamicForm!: FormGroup;
  @Output() nextAction: EventEmitter<void> = new EventEmitter<void>();

  next() {
    this.nextAction.emit();
  }

  split(value: string) {
    return value.split('\n');
  }
}
