import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Users } from "./entity/Users"
import { Orders } from "./entity/Orders"
import { Addresses} from "./entity/Addresses"
import { Cors } from "Cors"



AppDataSource.initialize().then(async (myDataSource) => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
     const stripe = require('stripe')('sk_test_51LNFdTGc3NL6dx9WbKbp2Y9WVcAEAqjyTlhp5XJxy4ChE8btrtLFtL93cyXnRp9zGwXiyDIMi2eoq0kYpDH9jf7i00BEMRtnJz');

      app.post('/users/payment/stripe/get-client-secret', async (req, res) => {

        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1099,
          currency: 'eur',
          payment_method_types: ['card'],
          metadata: {
            order_id: '6735',
          },
        });
        return res.json({ client_secret: paymentIntent.client_secret });
      });

      app.post("/users/payment/confirm", async (req, res) => {
        const stripe = require('stripe')('sk_test_51LNFdTGc3NL6dx9WbKbp2Y9WVcAEAqjyTlhp5XJxy4ChE8btrtLFtL93cyXnRp9zGwXiyDIMi2eoq0kYpDH9jf7i00BEMRtnJz');
        const { paymentIntent, paymentMethod } = req.body;
        try {
          const intent = await stripe.paymentIntents.confirm(paymentIntent, {
            payment_method: paymentMethod,
          });
      
          /* Update the status of the payment to indicate confirmation */
          res.status(200).json(intent);
        } catch (err) {
          console.error(err);
          res.status(500).json("Could not confirm payment");
        }
      });

      app.post("/user/register", async (req, res) => {
        const { email, name, password, phone } = req.body;
      
        /*  Add this user in your database and store stripe's customer id against the user   */
        try {
          const customer = await createStripeCustomer({ email, name, phone });
          console.log(customer);
          console.log(customer['id'])
          res.status(200).json({ message: "Customer created" });
        } catch (err) {
          console.log(err);
          res.status(400).json({ message: "An error occured" });
        }
      });


      app.post("/payment/method/attach", async (req, res) => {
        const { paymentMethod } = req.body;
      
        /* Fetch the Customer Id of current logged in user from the database */
        const customerId = "cus_M69MNz2lrGcDwu";
      
        try {
          const method = await attachMethod({ paymentMethod, customerId });
          console.log(method);
          res.status(200).json({ message: "Payment method attached succesully" });
        } catch (err) {
          console.log(err);
          res.status(400).json({ message: "Could not attach method" });
        }
      });
      
      /* ---------------------------------------------------------------------- */
      
      app.get("/payment/methods", async (req, res) => {
        /* Query database to fetch Stripe Customer Id of current logged in user */
        const customerId = "cus_M69MNz2lrGcDwu";
      
        try {
          const paymentMethods = await listCustomerPayMethods(customerId);
          res.status(200).json(paymentMethods);
        } catch (err) {
          console.log(err);
          res.status(500).json("Could not get payment methods");
        }
      });
      
      /* ---------------------------------------------------------------------- */
      
      app.post("/payment/create", async (req, res) => {
        const { paymentMethod } = req.body;
      
        /* Query database for getting the payment amount and customer id of the current logged in user */
      
        const amount = 1000;
        const currency = "INR";
        const userCustomerId = "cus_M69MNz2lrGcDwu";
      
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
            customer: userCustomerId,
            payment_method: paymentMethod,
            confirmation_method: "manual", // For 3D Security
            description: "Buy Product",
          });
      
          /* Add the payment intent record to your datbase if required */
          res.status(200).json(paymentIntent);
        } catch (err) {
          console.log(err);
          res.status(500).json("Could not create payment");
        }
      });
      
      /* ---------------------------------------------------------------------- */
      
      app.post("/payment/confirm", async (req, res) => {
        const { paymentIntent, paymentMethod } = req.body;
        try {
          const intent = await stripe.paymentIntents.confirm(paymentIntent, {
            payment_method: paymentMethod,
          });
      
          /* Update the status of the payment to indicate confirmation */
          res.status(200).json(intent);
        } catch (err) {
          console.error(err);
          res.status(500).json("Could not confirm payment");
        }
      });
      
      /* ---------------------------------------------------------------------- */
      
      /* Helper Functions  ----------------------------------------------------------------------------------------------------- */
      
      async function createStripeCustomer({ name, email, phone }) {
        return new Promise(async (resolve, reject) => {
          try {
            const Customer = await stripe.customers.create({
              name: name,
              email: email,
              phone: phone,
            });
      
            resolve(Customer);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      }
      
      async function listCustomerPayMethods(customerId) {
        return new Promise(async (resolve, reject) => {
          try {
            const paymentMethods = await stripe.customers.listPaymentMethods(customerId, {
              type: "card",
            });
            console.log(paymentMethods)
            resolve(paymentMethods);
          } catch (err) {
            reject(err);
          }
        });
      }
      
      function attachMethod({ paymentMethod, customerId }) {
        return new Promise(async (resolve, reject) => {
          try {
            const paymentMethodAttach = await stripe.paymentMethods.attach(paymentMethod.id, {
              customer: customerId,
            });
            resolve(paymentMethodAttach);
          } catch (err) {
            reject(err);
          }
        });
      }
      

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any)(myDataSource))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => {
                    console.log(`result => ${result.inspectionWindowEndTime}`);
                    result !== null && result !== undefined ? res.send(result) : undefined
                })
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3001)

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(Users, {
    //         firstName: "Timber",
    //         lastName: "Saw",
    //         role: "27"
    //     })
    // )



    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
