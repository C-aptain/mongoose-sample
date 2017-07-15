const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337
const mongoose = require('mongoose')
const Contact = require('./app/models/contact')
const router = express.Router()
const db = require('./db.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(db.url, {useMongoClient: true})

router.use((req, res, next) => {
  console.log('Something is happening.')

  next()
});

router.get('/', (req, res) => {
  res.json({message: 'zdarova! welcome to zalupa api!'})
})

router.route('/contacts')

  .post((req, res) => {
    var contact = new Contact()

    contact.name = req.body.name
    contact.type = req.body.type

    contact.save(e => {
      if (e) {
        res.send(e)
      }

      res.json({message: 'Contact created!'})
    })
  })

  .get((req, res) => {
    Contact.find((e, contacts) => {
      if (e) {
        e.send(e)
      }

      res.json(contacts)
    })
  })

router.route('/contacts/:id')

  .get((req, res) => {
    Contact.findById(req.params.id, (e, contact) => {
      if (e) {
        res.send(e)
      }

      res.json(contact)
    })
  })

  .put((req, res) => {
    Contact.findById(req.params.id, (e, contact) => {
      if (e) {
        res.send(e)
      }

      contact.name = req.body.name
      contact.type = req.body.type

      contact.save((e) => {
        if (e) {
          res.send(e)
        }

        res.json({message: 'Contact updated!'})
      })
    })
  })

  .delete((req, res) => {
    Contact.remove({
      _id: req.params.id
    }, (e) => {
      if(e) {
        res.send(e)
      }

      res.json({message: 'Contact deleted'})
    })
  })

app.use('/api', router)

app.listen(port)
console.log(`Server is live at ${port}`)