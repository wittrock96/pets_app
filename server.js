let express = require('express'),
	app=express(),
	bodyParser=require('body-parser'),
	mongoose=require('mongoose'),
	path=require('path');

let Schema = mongoose.Schema;

app.use(bodyParser.json())
app.use(express.static( __dirname + '/client/dist' ));

let AnimalSchema = new mongoose.Schema({
	name: { type: String, minlength: [3, "name must be 3 characters"], required: [true, 'please enter a name']},
	type: { type: String, minlength: [3, "type must be 3 characters"], required: [true, 'what kind of pet is this?']},
	desc: { type: String, minlength: [5, "desctription must be 5 characters"], required: [true, 'please enter desctription']},
	skill_1: {type: String},
	skill_2: {type: String},
	skill_3: {type: String},
	likes: {
 		type: Number,
 		default: 0
 	}

}, {timestamps: true})

mongoose.connect('mongodb://localhost/animals')
mongoose.Promise = global.Promise;

mongoose.model('Animal', AnimalSchema);

var Animal = mongoose.model('Animal')


app.get('/animals', (req, res)=>{
	console.log('inside /animals')
	Animal.find({}).sort('type')
	.exec((err, animals)=>{
		if(err){
			return res.status(400).json({message:'error', error: err});
		}
		else{
			return res.json({message: 'success', animals: animals})
		}
	})
})
app.get('/animal/:id', (req, res)=>{
	console.log('inside /animal/:id')
	Animal.findOne({_id: req.params.id}, (err, animal)=>{
		if(err){
			console.log('soemthing went wrong', err)
			return res.status(400).json({message: 'error', error: err})

		}
		else{
			return res.json({message: 'success', animal: animal})
		}
	})
})
app.post('/animal/new', (req, res)=>{
	console.log('inside /animal/new')
	let animal = new Animal({name: req.body.name,
		type: req.body.type,
		desc: req.body.desc,
		skill_1: req.body.skill_1,
		skill_2: req.body.skill_2,
		skill_3: req.body.skill_3})
	animal.save((err)=>{
		if(err){
			console.log('something went wrong in /animal/new', err)
			return res.status(400).json({message: 'error', error: err})

		}
		else{
			console.log('created animal')
			res.json('added animal')
		}
	})
})
app.patch('/animal/update/:id', (req, res)=>{
	Animal.findOne({_id: req.params.id}, (err, animal)=>{
		if(err){
			console.log('something went wrong')
			return res.status(400).json({message: 'error', error: err})
		}
		else{
			console.log('updating')
			animal.name = req.body.name
			animal.type = req.body.type
			animal.desc = req.body.desc
			animal.skill_1 = req.body.skill_1
			animal.save((err)=>{
				if(err){
					console.log('something went wrong', err)
					return res.status(400).json({message: 'error', error: err})
				}
				else{
					console.log('update, coming back')
					res.json({message: 'success'})
				}
			})
		}
	})
})
app.delete('/delete/:id', (req, res)=>{
	console.log('inside /delete')
	Animal.findOneAndRemove({_id: req.params.id},
		(err, animal)=>{
			console.log('animal adopted')
			res.json({message: 'success'})
		})
})
app.patch('/like/:id', (req, res)=>{
	console.log('inside /like')
	Animal.findOneAndUpdate({_id: req.params.id}, {$inc: {likes: 1}})
		.exec((err, likes)=>{
			if(err){
				return res.status(400).json({message: 'error', error: err})
				console.log(err)

			}
			else{
				return res.json({message:'success', likes: likes})
			}

		})

})


app.all("*", (req, res, next) => {
	res.sendFile(path.resolve('./client/dist/index.html'))
})

app.listen(8000, function(){
	console.log('listening on port 8000')
})
