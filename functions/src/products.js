const { connectDb } = require("./db");
// getAllProducts
exports.getAllProducts = (req, res) => {
  const db = connectDb();
  db.collection("clothes")
    .get()
    .then((collection) => {
      const clothes = collection.docs.map((doc) => {
        let item = doc.data();
        item.id = doc.id;
        return item;
      });
      res.send(clothes);
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

//getProductByID
exports.getProductById = (req, res) => {
  // connect to databse
  const db = connectDb();
  // get productId from req.params
  const { productId } = req.params;
  // get document from collection
  db.collection("clothes")
    .doc(productId)
    .get()
    .then((doc) => {
      let item = doc.data();
      item.id = doc.id;
      // return item
      res.send(item);
    })
    .catch((err) => res.status(500).send(err));
};

//createProduct
exports.createProduct = (req, res) => {
  // check that all required fields are present
  if (!req.body.sku || !req.body.type || !req.body.price) {
    res.status(401).send({ message: "invalid request" });
    return;
  }

  let newItem = {
    sku: req.body.sku,
    type: req.body.type,
    price: Number(req.body.price.toFixed(2)),
    graphic: req.body.graphic ? true : false,
  };
  if (req.body.sizes) newItem.sizes = req.body.sizes;
  if (req.body.color) newItem.color = req.body.color;
  if (req.body.brand) newItem.brand = req.body.brand;
  if (req.body.style) newItem.style = req.body.style;

  const db = connectDb();
  db.collection("clothes")
    .add(newItem)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(500).send(err));
};

//updateProduct
exports.updateProduct = (req, res) => {
  const { productId } = req.params;
  const db = connectDb();
  db.collection("clothes")
    .doc(productId)
    .update(req.body)
    .then((docRef) => res.status(202).send({ message: "updated" })) //why docRef is not used??
    .catch((err) => res.status(500).send(err));
};

// deleteProduct
exports.deleteProduct = (req, res) => {
  const { productId } = req.params;
  const db = connectDb();
  db.collection("clothes")
    .doc(productId)
    .delete()
    .then(() => res.status(202).send({ message: "deleted" }))
    .catch((err) => res.status(500).send(err));
};
