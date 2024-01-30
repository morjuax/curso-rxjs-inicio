import { of } from "rxjs";


// const obs$ = of(1,2,3,4,5,6)
const obs$ = of(...[1,2,3,4,5,6],2,3,4,5)

console.log('Inicio del Obs$');
obs$.subscribe(
  {
    next: (value) => console.log('next', value),
    complete: () => console.log('secuency ended')
  }
)
console.log('Fin del Obs$');