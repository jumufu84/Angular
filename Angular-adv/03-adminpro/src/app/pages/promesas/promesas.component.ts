import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {

    //   if(false){
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Salió mal');
    //   }

    // });

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch((error) => console.log('Error en mi promesa->',error));

    // console.log('Fin init');

    this.getUsusarios().then((usuarios: any) => {
      // console.log(usuarios);
    })
  }

  getUsusarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then((resp) => { resp.json()
        .then((body) => resolve (body.data));
      });
    })
  }

}
