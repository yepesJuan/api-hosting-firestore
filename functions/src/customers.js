const { connectDb } = require("./db");

exports.createCustomer = async (req, res) => {
    // check that all required fields are present
    if(!req.body.name || !req.body.phone || !req.body.email) {
        res.status(401).send({message: 'invalid request'})
        return
    }
    // add some rules for email@some.some ,phone + - - -, 
    let newItem = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    if(req.body.age) newItem.age = req.body.age
   // how to with asyc?
    const db = connectDb()
    // db.collection('customers').add(newItem) // this is the name of collection
    //     .then(docRef => res.status(201).send({ id: docRef.id}))
    //     .catch(err => res.status(500).send(err))
    try {
      const docRef  = await db.collection('customers').add(newItem) // this is the name of collection
      res.status(201).send({ id: docRef.id})
      } catch(err) {
        res.status(500).send(err)
      }
      
        
    
}

exports.getAllCustomers = (req, res) => {
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
    const db = connectDb();
    db.collection("customers")
      .get()
      .then((collection) => {
        const customers = collection.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          return item;
        });
        res.send(customers);
        // another way to do line 11..
        // res.send({
        //     status: '200',
        //     result: clothes.length,
        //     sucess: true,
        //     data: clothes
        // })
      })
      .catch((err) => res.status(500).send(err));
  };

  