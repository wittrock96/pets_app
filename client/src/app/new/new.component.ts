import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newAnimal: any;
	response: any;
	error: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) { }

  ngOnInit() {
  	this.newAnimal = {
  		name:'',
  		type: '',
  		desc: '',
  		skill_1:'',
  		skill_2:'',
  		skill_3:''}
  }

  createAnimal(event){
  	event.preventDefault()
  	console.log('creating animal')
  	let observable = this._httpService.create(this.newAnimal)
  	observable.subscribe(data =>{
  		data = data.json()
  		this.error = data['error']
  		console.log(this.error)
  		this._router.navigate(['']);
  	})
  }
}
