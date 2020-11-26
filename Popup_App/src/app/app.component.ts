import { Component } from '@angular/core';
import { PrimaryEventBusService } from './services/primary-eventBus/primary-event-bus.service'
@Component({
  selector: 'popup-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'popup-app';
  constructor()
  {
  }
}
