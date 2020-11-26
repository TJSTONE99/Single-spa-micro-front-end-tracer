import { Component, OnInit } from '@angular/core';
import { PrimaryEventBusService } from '../../services/primary-eventBus/primary-event-bus.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private eventBus:PrimaryEventBusService) { }
  registered: boolean = false

  ngOnInit(): void {
  }

  onSubmit(input:string): void{
    if (!input) return
    this.registered = true
    this.eventBus.sendMsg(input)
  }

}
