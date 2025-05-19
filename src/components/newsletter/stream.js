import {
  Subject,
  interval,
  catchError,
  of,
  timer,
  fromEvent,
  merge,
} from "rxjs";
import { exhaustMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

export default class Stream {
  constructor(urlBase, btnElement) {
    this.urlBase = urlBase;
    this.btnElement = btnElement;
    this.stream$ = this.createStream();
    this.subject$;
  }

  createStream() {
    return merge(
      timer(0),
      interval(50000),
      fromEvent(this.btnElement, "click"),
    ).pipe(
      exhaustMap(() => {
        return ajax.getJSON(`${this.urlBase}/news`).pipe(
          catchError((error) => {
            console.error("error: ", error);
            return of({ status: "error" });
          }),
        );
      }),
    );
  }

  createSubject() {
    const subject$ = new Subject();
    this.stream$.subscribe(subject$);
    return subject$;
  }

  addObserver(observer) {
    if (!this.subject$) {
      this.subject$ = this.createSubject();
    }
    this.subject$.subscribe(observer);
  }
}
