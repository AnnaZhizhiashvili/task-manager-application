import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  @Input() type: 'input' | 'textarea' = 'input';
  @Input() placeHolder = 'space holder';
  @Input() btnText = 'Add a new item';
  @Output() onClickCancel = new EventEmitter();
  @Output() onClickAddBtn = new EventEmitter();
  @Output() valueChanged = new EventEmitter();
  value: string;

  cancel() {
    this.onClickCancel.emit();
  }
  onClickAdd() {
    this.onClickAddBtn.emit();
  }
  onValueChange() {
    this.valueChanged.emit(this.value);
  }
}
