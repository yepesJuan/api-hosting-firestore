const { connectDb } = require("./db");

exports.createOrders = (req, res) => {
    // check that all required fields are present
    if(!req.body.date || !req.body.orderNum || !req.body.customerId) {
        res.status(401).send({message: 'invalid request'})
        return
    }

    let newItem = {
        orderNum: req.body.orderNum = req.body.orderNum + 1, // how to make this work?
        date: req.body.date, // new Date?
        credit: req.body.customerId,
    }

    const db = connectDb()
    db.collection('orders').add(newItem)
        .then(docRef => res.status(201).send({ id: docRef.id})) // what is docref
        .catch(err => res.status(500).send(err))
}

exports.getAllOrders = (req, res) => {
    const db = connectDb()
    db.collection('orders')
        .get()
        .then((collection) => {
            const orders = collection.docs.map((doc) => {
                let item = doc.data()
                item.id = doc.id
                return item
            })
        res.send(orders)
        })
    .catch((err) =>  res.status(500).send(err))
}

exports.getOrdersById = (req,res) => {
    const db = connectDb()
    const { productId } = req.params
    db.collection("orders")
        .doc(productId)
        .get()
        .then((doc) => {
            let item = doc.data()
            item.id = doc.id
            res.send(item)
        })
    .catch((err) => res.status(500).send(err))
}

