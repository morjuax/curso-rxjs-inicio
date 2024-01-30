import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next: ', value),
  error: error => console.warn('error: ', error),
  complete: () => console.info('Completed')
};

// para que este observable se ejecute tiene que haber una subscription
const interval$ = new Observable<number>(subs => {

  // emite numeros aleatorios cada segundos
  const intervalID = setInterval(
    () => subs.next(Math.random()), 1000
  );

  // esto se ejecuta cuando se llame el unsubscribe
  return () => {
    clearInterval(intervalID)
    console.log('Interval destroyed');
  }
});

/*
* 0 - Sirve para tener el mismo valor a hora de subcribirse
* 1 - Casteo multiple
* 2 - Tambien es un observer
* 3 - Next, error y complete
*/
const subject$ = new Subject()
const subscritions = interval$.subscribe(subject$)

// const subs1 = interval$.subscribe(rnd => console.log('subs1', rnd));
// const subs2 = interval$.subscribe(rnd => console.log('subs2', rnd));

const subs1 = subject$.subscribe(rnd => console.log('subs1', rnd));
const subs2 = subject$.subscribe(rnd => console.log('subs2', rnd));



setTimeout(() => {
  // agregar data al flujo
  subject$.next(10)
  subject$.complete();
  subscritions.unsubscribe()

}, 3500)