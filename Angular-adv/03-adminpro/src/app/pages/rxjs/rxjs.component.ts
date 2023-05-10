import { NotExpr } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, retry, take,map, tap, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription = new Subscription();


  constructor(){

    // this.retornaObservable()
    // .pipe(retry(2))
    // .subscribe({
    //   next: x => console.log(x),
    //   error: error => console.warn('Error', error),
    //   complete: () => console.info('TERMINADO')
    // }
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      x=>console.log(x)
    );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
            .pipe(
              map(x=>x+1),
              filter(x => x%2 === 0 ? true : false),
              // take(10),
              );
  }


  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observer => {
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===2){
          observer.error('VALOR 2');
        }
      },1000)
    });
  }

}
