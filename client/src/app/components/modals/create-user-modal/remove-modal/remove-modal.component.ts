import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent {
  @Output() onConfirm = new EventEmitter<string>();

  // Estas variables permiten llevar el control del modal (mostrar-ocultar)
  showModal = false;
  hiddenModal = false;

  idToDelete:string;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  confirmation():void{
    this.onConfirm.emit(this.idToDelete);
  }

  // Abrir el modal y pasar el ID del proyecto
  openModal() {
    this.showModal = true;
    this.hiddenModal = false;
  }

  // Cerrar el modal cuando se hace clic en "Cancelar"
  cancel() {
    this.showModal = false;
  }

  exitModal() {
    this.showModal = false;
    this.hiddenModal = true;
  }
}
