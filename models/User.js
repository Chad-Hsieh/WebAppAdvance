
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String, 
        require: true
    },
    role: {
        type: String,
        default: 'USER',
    },
    lastName: {
        type: String,
        //require: true        
    },
    firstName: {
        type: String,
        //require: true
    },
    nickName: {
        type: String,
        //require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    newPassword: {
        type: String,
    },
    isADMIN: {
        type: Boolean,
        default: false
    }


});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew){
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
    else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch)
    })
}


module.exports = mongoose.model('User',UserSchema)