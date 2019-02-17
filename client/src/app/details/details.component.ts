import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	animal: any;
	buttonDisabled: boolean = false;
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
  	private _router: Router) { }

  ngOnInit() {
  
  	this.getAnimal()
  }


  	    getAnimal(){
  		this._route.params.subscribe((params)=>{
  			let observable = this._httpService.oneAnimal(params['id'])
  			observable.subscribe(data =>{
  				data = data.json()
  				this.animal = data['animal']
  				console.log(this.animal)
  				
  			})
  		})
  	}
  	removeAnimal(){
  	console.log('detroying')
  	let observable = this._httpService.remove(this.animal._id)
  	observable.subscribe(data =>{
  			console.log('deleted', data);
  			this._router.navigate(['']);
  		})
  }
  	likeAnimal(id, event){
  		console.log('liking')
  		let observable = this._httpService.like(id)
  		observable.subscribe(data =>{
  			console.log(data)
  			this.getAnimal()
  			this.buttonDisabled = true
  			

  		})
  	}
  	

}
