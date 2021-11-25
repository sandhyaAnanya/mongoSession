const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema

const orderSchema = new Schema( {
    pid: {
        type: String,
        // required: true,
        minlength:3,
        maxlength: 100,
    },
    pName: {
        type: String,
        // required: true,
        minlength:3,
        maxlength: 100,
    },
    pquantity: {
        type: String,
        // required: true,
        minlength:1,
        maxlength: 10000,
    },
    pTotalprice: {
        type: Number,
        // required: true,
        // min: 0,
        // max: 10000000,
        validate: {
            validator: ( val ) => {
                // if ( val.toString().length > 6 ) {
                //     return false
                // } else {
                //     return true
                // }
                return !(val.toString().length>6)
            },
            message: ( val ) => {
                return `${val.path} length should not be greater than 6`
            }
        }
    },

    date: {
        type: Date,
        default:Date.now()
    }
} )
module.exports = mongoose.model( 'orders', orderSchema  );
