const express = require (`express`)
const router = express.Router()
const Transaction = require(`../models/transactionSchema`)


router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})


router.get(`/` , function (request , response) {
    response.send (`Hello`)
})

router.get(`/transactions` , function (request, response) {
   Transaction.find({} , function(error , data) {
    error 
    ? response.status(500).send(error) 
    : response.send(data)
   })
})

router.get(`/breakDown` , function (request, response) {
    Transaction.aggregate(
        [
          {
            $group :
              {
                _id : "$category",
                amount : {$sum : `$amount`}
              }
           }
         ]
       ).then (data => response.send(data)) 
    
})

router.post(`/transaction`, function (request , response) {
    const t1 = new Transaction(request.body)
    console.log(request.body)
    t1.save(function (error , data) { 
        if (error) { response.status(500).send(error) }
        else { response.status(201).send(data)} 
    } )
})

router.delete(`/transaction/:id` , function (request , response) {
    const id = request.params.id
    Transaction.findByIdAndRemove(id , function (error , data ) {
        error 
        ? response.status(500).send(error.message) 
        : data === null 
        ? response.status(404).send(`Not found !`) 
        : response.send(data)
    })
})

module.exports = router