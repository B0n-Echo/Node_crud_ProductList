var Productdb = require('../model/model');

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Empty product cannot be created"});
        return;
    }

    // new 
    const product = new Productdb({
        product_name : req.body.product_name,
        price : req.body.price,
        demand : req.body.demand
    })

    product
        .save(product)
        .then(data => {
            res.redirect('/add-product');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while executing the create operation"
            });
        });

}


exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Productdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : `Product with ID ${id} not found`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: `Erro retrieving product with id ${id}`})
            })

    }else{
        Productdb.find()
            .then(product => {
                res.send(product)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving product information" })
            })
    }

    
}

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Error Updating product with ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update product information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Productdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Product was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
}