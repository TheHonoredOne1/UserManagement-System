const mongoose = require('mongoose')
const Customer = require('../models/Customer')

/**
 * GET /
 * Homepage
*/
exports.homepage = async (req, res) => {
  // Remove
  // const messages = await req.consumeFlash('info');
  // Use this instead
  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }

};


/**
 * GET /
 * New Customer Form
*/
exports.addCustomer = async (req, res) => {
  const locals =
  {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };
  res.render("customer/add", locals);
};


/**
 * POST /
 * Create New Customer
 */
exports.postCustomer = async (req, res) => {

  console.log(req.body);
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");
    res.redirect("/");
  } 
  catch (error) {
    console.log(error);
  }
};
