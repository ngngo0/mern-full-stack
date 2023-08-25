const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation-> have values, valid email, strong password
    if(!email || !password){
        throw Error('All fields must be filled oogabooga' + email + password)
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    //this-model and findby email
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }

    //arg-> numberofrounds/cost of salt --> signup time vs cracking time
    const salt = await bcrypt.genSalt(10)
    //hash the password
    const hash = await bcrypt.hash(password, salt)

    //create the new user with the hash as a password
    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function(email,password){
    // validation-> have values
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    //this-model and findby email
    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user
}
module.exports = mongoose.model('User', userSchema)