const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cd8d4f505ed048dabdd8a7892d09c32b'
   });

const handelClarifaiApi= (req, res)=> {
    app.models.predict('face-detection', req.body.input)
    .then(data => res.json(data))
    .catch(_ => res.status(400).json("can't connect to the api"))

}
const handelImage = (req , res, db)=> {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning("entries")
    .then(entries => {
        res.json(entries[0])
    })
    .catch( _ => res.status(400).json("unable to getting entries"))
}

module.exports = {
    handelImage: handelImage,
    handelClarifaiApi: handelClarifaiApi
}