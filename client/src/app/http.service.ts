import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

	create(newAnimal){
		console.log('in service, heading to server')
		console.log(newAnimal)
		return this._http.post('/animal/new', newAnimal)
	}
	allAnimals(){
		console.log('inservice, getting animals')
		return this._http.get('/animals')
	}
	oneAnimal(id){
		console.log('inside service for update')
		return this._http.get(`/animal/${id}`)
	}
	update(animal){
		console.log('in service', animal)
		return this._http.patch(`/animal/update/${animal._id}`, animal)
	}
	remove(id){
		console.log('inside HttpService')
		return this._http.delete(`/delete/${id}`)
	}
	like(id){
		console.log('liking')
		return this._http.patch(`/like/${id}`, id)
	}

}
