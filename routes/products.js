const express = require( 'express' );
const app = express()
const router = express.Router()

const product = require('../models/product')
const order = require('../models/order')

router.get( '/products',async ( req, res ) => {
    console.log(req.session)
    if(req.session.userid){

        try {
            const products = await product.find().lean();
            res.render( './products.handlebars',{products} )
        } catch ( err ) {
            res.redirect('/error')
        };
    }else{
        res.redirect('/')
    }
})
router.get( '/add-products', ( req, res ) => {
    if(req.session.userid){

        res.render( './add-product.handlebars' )
    }else(
            res.redirect('/')
    )
})
//search products
router.get('/search-products',(req,res)=>{
    if(req.session.userid){

        res.render('./search-product.handlebars')
    }else{
        res.redirect('/')
    }
})
//get 
router.get('/create-order',(req,res)=>{
    if(req.session.userid){

        res.render('./createorder-product.handlebars')
    }else{
        res.redirect('/')
    }
})
//show get
router.get( '/show-order',async ( req, res ) => 
{
    if(req.session.userid){

        const orders = await order.find().lean();    
            res.render( './showproducts.handlebars',{orders})
    }else{
        res.redirect('/')
    }
})
router.get('/products/search-products',(req,res)=>{
    // res.order.find({pName:{$regex:}})
})
router.post( '/add-products', async ( req, res ) => {
    if(req.session.userid){

        console.log( req.body );
        let { pName, pDesc, pPrice } = req.body;
         pPrice = parseInt( pPrice );
        try {
            await product.insertMany( [
    
                {
                    pName,
                    pDesc,
                    pPrice,
                }
            ])
            res.redirect( '/products/products' );
        } catch ( err ) {
            console.log( err );
            res.redirect('/error')
        }
    }else{
        res.redirect('/')
    }

    // res.send('Product Added Successfully')
} )


router.post( '/createorder-products', async ( req, res ) => {
    if(req.session.userid){

        console.log( req.body );
        let { pid,pName, pquantity ,pTotalprice } = req.body;
        try {
            await  order .insertMany( [
                {
                    pid,pName, pquantity ,pTotalprice
                }
            ])
            res.redirect( '/products/show-order' );
        } catch ( err ) {
            console.log( err );
            res.redirect('/error')
        }
    }else{
        res.redirect('/')
    }

    // res.send('Product Added Successfully')
} )

router.get( '/edit-product/:_id', async( req, res ) => {
    if(req.sesison.useid){

        console.log( req.params._id );
    
        try{
           const productToEdit =  await product.findOne({
                    _id: req.params._id
            }).lean()
            res.render('./edit-product.handlebars',{selectedProduct : productToEdit})
         } catch(err) {
             res.redirect('/error')
         }  
    }else{
        res.redirect('/')
    }
} )

router.get( '/edit-order/:_id', async( req, res ) => {
    if(req.session.userid){

        console.log( req.params._id );
    
        try{
           const orderToEdit =  await order.findOne({
                    _id: req.params._id
            }).lean()
            res.render('./edit-order.handlebars',{selectedOrder : orderToEdit})
         } catch(err) {
             res.redirect('/error')
         }  
    }else{
        res.redirect('/')
    }
} )
router.post( '/edit-product', async( req, res ) => {
    if(req.session.userid){

        console.log( req.params._id );
        let { _id, pName, pDesc, pPrice } = req.body
        try{
    
            await product.updateOne({
                _id
            },{
                $set :{
                    pName, pDesc, pPrice
                }
            },{
                runValidators: true
            })
            res.redirect('/products/products')
        }catch(err){
            res.redirect('/error')
        }
    }else{
        res.redirect('/')
    }
} )

router.post( '/edit-product', async( req, res ) => {
    if(req.session.userid){

        console.log( req.params._id );
        let { _id, pName,pquantity, pPrice } = req.body
        try{
    
            await order.updateOne({
                _id
            },{
                $set :{
                    pName,pquantity, pPrice
                }
            },{
                runValidators: true
            })
            res.redirect('/products/show-order')
        }catch(err){
            res.redirect('/error')
        }
    }else{
        res.redirect('/')
    }
} )
router.get('/search',(req,res)=>{
    if(req.session.userid){

        res.render('./search.handlebars')
    }else{
        res.redirect('/')
    }
    
    })
    
    router.post('/search',async(req,res)=>{
        if(req.session.userid){

            const searchData =req.body.searchData
            console.log(searchData)
        
          try{  
        
            const products = await product.find().lean();
        
            const matchingObj =  products.filter((val,index)=>{
        
              const len = searchData.split('').length
        
              const newVal = val.pName.split('').slice(0,len).join('')
              console.log(newVal)
              return val.pName===searchData || newVal===searchData
            })
        
        
            console.log("matching Data",matchingObj);
        
            matchingObj.length===0?  res.send("No matching Data") :
            res.render("./matchingProductsList.handlebars", { matchingObj });
          }
          catch(err){
            console.log(err);
          }
        }else{
            res.redirect('/')
        }
    
    
    
    })
  
router.get( '/delete-product/:_id', async( req, res ) => {
    if(req.session.userid){

        const _id = req.params._id;
            try{
                await product.deleteOne({
                    _id: _id
    
    
                })
                    /* delete multiple documents
                    await product.deleteMany({
                        _id = ['618ce87e6f32c78924c97a33','618bbd80b6a701fe87e450d9']
                    }) */
    
    
                res.redirect('/products/products')
            }catch(err){
                res.redirect('error')
            }
    }else{
        res.redirect('/')
    }
    } )

    router.get( '/delete-product/:_id', async( req, res ) => {
        if(req.session.userid){

            const _id = req.params._id;
                try{
                    await order.deleteOne({
                        _id: _id
        
        
                    })
                        /* delete multiple documents
                        await product.deleteMany({
                            _id = ['618ce87e6f32c78924c97a33','618bbd80b6a701fe87e450d9']
                        }) */
        
        
                    res.redirect('/products/show-order')
                }catch(err){
                    res.redirect('error')
                }
        }else{

            res.redirect('/')
        }
        } )
    

module.exports = router