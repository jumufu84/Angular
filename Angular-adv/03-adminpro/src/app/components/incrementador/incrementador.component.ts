import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  // @Input('valor') progreso: number = 40; --> Así podemos renombrar el input en el componente padre, es decir, se pondría [valor] en el componente padre, aunque en este seguiría siendo progreso
  @Input() progreso: number = 10;
  @Input() btnClass: string = 'btn-primary';

  // @Ouput('valor') --> Se puede hacer lo mismo
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }


  cambiarValor(valor: number){
    if (this.progreso >= 100 && valor >=0){
      this.valorSalida.emit(100);
       return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.valorSalida.emit(this.progreso + valor);
    return this.progreso = this.progreso + valor;
  }

  onChange(nuevoValor: any) {
    if (nuevoValor >= 100){
      this.progreso = 100;
    } else if(nuevoValor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }

}
