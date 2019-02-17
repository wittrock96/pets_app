import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	animals: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router) { }

  ngOnInit() {
  	this.displayAnimals()
  }

  displayAnimals(){
  	console.log('getting animals')
  	let observable = this._httpService.allAnimals()
  	observable.subscribe(data=>{
  		data = data.json()
  		this.animals= data['animals']
  		console.log(this.animals)
  	})
  }

}
