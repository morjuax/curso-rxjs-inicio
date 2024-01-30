import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next: ', value),
  error: error => console.warn('error: ', error),
  complete: () => console.info('Completed')
};

const interval$ = new Observable<number>(subs => {
  let count = 0;
  const interveal = setInterval(() => {
    count++
    subs.next(count)
    console.log(count);
    
  }, 1000) 

  setTimeout(() => {
    subs.complete()
  }, 2500)

  return () => {
    clearInterval(interveal);
    console.log('Interval destroyed');
  }

})

const subs1 = interval$.subscribe(observer);
const subs2 = interval$.subscribe(observer);
const subs3 = interval$.subscribe(observer);

subs1.add(subs2)

setTimeout(() => {
  subs1.unsubscribe()
  // subs2.unsubscribe()
  // subs3.unsubscribe()
  console.log('timeout completed');
  
}, 6000)