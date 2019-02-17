import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
	animal: any;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router) { }

  ngOnInit() {
  		this.animal = {
	  		name:'',
	  		type: '',
	  		desc: '',
	  		skill_1:'',
	  		skill_2:'',
	  		skill_3:''
		}
		console.log('intializing')
		this._route.params.subscribe((params: Params)=>{
			this.getAnimal(params['id'])
		})
  	}
  	getAnimal(id){
  		console.log('getting animal')
  		let observable = this._httpService.oneAnimal(id)
  		observable.subscribe(data=>{
  			data = data.json()
  			console.log('got the animal', data)
  			this.animal = data['animal']
  			console.log(this.animal)
  		})
  	}
  	updateAnimal(event){
  		event.preventDefault()
  		console.log('updating animal')
  		let observable = this._httpService.update(this.animal)
  		observable.subscribe(data=>{
  			data = data.json()
  			console.log('updated the animal', data)
  			this.animal = data
  			this._router.navigate(['']);

  		})
  	}
  }


