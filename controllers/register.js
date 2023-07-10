const handelRegister = (req, res , db , bcrypt) => {
    const {name , email, password} = req.body
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    // we used transaction because we had to do more than two things at once
    // if one fails , the others will fail also and the operation will stop
    // it should the two insert be done together
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        //returning here : spcifies which column you want to return from the only inserted user
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name : name,
                    email : Object.values(loginEmail[0])[0],
                    joined : new Date()
            }).then(user => {
                res.json(user[0])
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to join'))
}

module.exports = {
    handelRegister : handelRegister
}