import { Subject, Subscription } from 'https://dev.jspm.io/rxjs@6/_esm2015'
import { filter, map } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators'

export class EventBusService {
   

  constructor() {this.subject$ = new Subject() }

  emit(event) {
    this.subject$.next(event)
  }

  on(eventName, action) {
    return this.subject$.pipe(
      filter( (e) => e.name === eventName),
      map( (e) => e["data"])).subscribe(action)
  }
}

var EventBus= new EventBusService

Promise.all([System.import('single-spa'), System.import('single-spa-layout')]).then(([singleSpa, singleSpaLayout]) => {
    const { constructApplications, constructLayoutEngine, constructRoutes } = singleSpaLayout;
    const { registerApplication, start } = singleSpa;

    const routes = constructRoutes(document.querySelector('#single-spa-layout'));
    const applications = constructApplications({
      routes,
      loadApp({ name }) {
        return System.import(name);
      },
    });
    const layoutEngine = constructLayoutEngine({ routes, applications });
    applications.forEach(app=>{
      app.customProps = { EventBus: EventBus }
    });
    applications.forEach(registerApplication)
    //{ EventBus: EventBus }
    start();
});
