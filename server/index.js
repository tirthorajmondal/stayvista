const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 8000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174, https://dwt1z045-5173.asse.devtunnels.ms/'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@stayvista.lpi5mcd.mongodb.net/?retryWrites=true&w=majority&appName=stayvista`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const roomsCollection = client.db('stayvista').collection('rooms')
    const usersCollection = client.db('stayvista').collection('users')

    // auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })

    // users related api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // get all user data from db
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    // get single user form DB
    app.get('/user/:email', async (req, res) => {
      const email = req.params?.email;
      if (!email || email === 'undefined') {
        return res.send({ error: { message: 'invilid email' } })
      }
      const result = await usersCollection.findOne({ email: email })
      res.send(result)
    })

    // update a user role in DB
    app.patch('/user/update/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email }
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now()
        }
      }
      const result = await usersCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // save user data in DB
    app.put('/user', async (req, res) => {
      const user = req.body;
      const query = { email: user?.email }

      // check if user is already exist
      const isExist = usersCollection.findOne(query)
      if (isExist) {
        if (user.status === 'Requested') {
          // if existing user try to become host
          const result = await usersCollection.updateOne(query, { $set: { status: user?.status } })
          return res.send(result)
        }
        else {
          // if existing user login again
          return res.send(isExist)
        }
      }

      //save user for the first time 
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now()
        }
      }
      const result = await usersCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })

    //rooms related api   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Get all rooms
    app.get('/rooms', async (req, res) => {
      const category = req.query.category;
      let query = {};
      if (category && category !== 'null') {
        query = { category: category }
      }
      const result = await roomsCollection.find(query).toArray()
      res.send(result)
    })

    // Get a single room by id
    app.get('/room/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.findOne(query);
      res.send(result)
    })

    // add a room in DB
    app.post('/rooms', async (req, res) => {
      const room = req.body;
      const result = await roomsCollection.insertOne(room);
      res.send(result)
    })

    // Get all rooms for host
    app.get('/my-listings/:email', async (req, res) => {
      const email = req.params.email;
      const query = { 'host.email': email };

      const result = await roomsCollection.find(query).toArray()
      res.send(result)
    })

    // delete a room 
    app.delete('/room/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roomsCollection.deleteOne(query)
      res.send(result)
    })







    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from StayVista Server..')
})

app.listen(port, () => {
  console.log(`StayVista is running on port ${port}`)
})