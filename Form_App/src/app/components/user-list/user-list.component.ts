import { NgRedux } from '@angular-redux/store'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IAppState } from 'src/app/store/model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
    ) {
    this.JSON = JSON
  }
  $users:Observable<[]>
  JSON:JSON

  ngOnInit(): void {
    this.$users = this.ngRedux.select(state=> state.users).pipe(
      map(items => items.users)  
    )
  }

  gotoChat(user){
    this.router.navigate(['form', user.clientID], {skipLocationChange: true})
  }

}
