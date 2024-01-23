import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next: ', value),
  error: error => console.warn('error: ', error),
  complete: () => console.info('Completed [obs]')
  
}

// const obs$ = Observable.create()
const obs$ = new Observable<string>( subs => {

  subs.next('Hola')
  subs.next('Mundo')

  subs.next('Hola')
  subs.next('Mundo')

  // force error
  // const a = undefined;
  // a.name = 'Juan'

  subs.complete();
});

// obs$.subscribe(
//   {
//     next: (value) => console.log('next: ', value),
//     error: (error) => console.warn('error: ', error),
//     complete: () => console.log('Completed')
//   }
// )

obs$.subscribe(observer)