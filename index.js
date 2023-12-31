const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('UserName: ', process.env.DB_USER);
console.log('Password: ', process.env.DB_PASS);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6b6iw5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const database = client.db("hotelDB");
    const usersCollectionStunning = database.collection("stunning");
    const usersCollectionTestimonials = database.collection("testimonials");
    const usersCollectionRooms = database.collection("rooms");
    const usersCollectionRoomPhotos = database.collection("roomPhotos");
    const usersCollectionRoomBooking = database.collection("booking");
    const usersCollectionRoomReview = database.collection("review");

    app.get('/stunning', async (req, res) => {
      const cursor = usersCollectionStunning.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/testimonials', async (req, res) => {
      const cursor = usersCollectionTestimonials.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/rooms', async (req, res) => {
      const cursor = usersCollectionRooms.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/rooms/:title', async (req, res) => {
      const title = req.params.title;
      const query = { title: title }
      const result = await usersCollectionRooms.findOne(query);
      res.send(result);
    })

    app.patch('/rooms/:title', async (req, res) => {
      const title = req.params.title;
      const query = { title: title }
      const updateRoom = req.body;
      console.log(updateRoom);
      const updateDoc = {
        $set: {
          available: updateRoom.available,
          review: updateRoom.review,
          star: updateRoom.star
        }
      }
      const result = await usersCollectionRooms.updateOne(query, updateDoc);
      res.send(result);
    })

    app.get('/roomPhotos', async (req, res) => {
      const cursor = usersCollectionRoomPhotos.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/roomPhotos/:title', async (req, res) => {
      const title = req.params.title;
      const query = { title: title }
      const cursor = usersCollectionRoomPhotos.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/booking', async (req, res) => {
      const cursor = usersCollectionRoomBooking.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/booking/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const cursor = usersCollectionRoomBooking.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/booking/:email/:title/:review', async (req, res) => {
      const review = req.params.review;
      const email = req.params.email;
      const title = req.params.title;
      const query = { email: email, title: title, review: review }
      const cursor = usersCollectionRoomBooking.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/booking/:email/:date/:title', async (req, res) => {
      const title = req.params.title;
      const date = req.params.date;
      const query = { title: title, date: date }
      const cursor = usersCollectionRoomBooking.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/booking', async (req, res) => {
      const room = req.body;
      console.log('new room', room);
      const result = await usersCollectionRoomBooking.insertOne(room);
      res.send(result);
    })

    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id;
      console.log('delete server id: ', id);
      const cursor = { _id: new ObjectId(id) };
      const result = await usersCollectionRoomBooking.deleteOne(cursor);
      res.send(result);
    })

    app.patch('/booking/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const updateRoom = req.body;
      console.log(updateRoom);
      const updateDoc = {
        $set: {
          date: updateRoom.date
        }
      }
      const result = await usersCollectionRoomBooking.updateOne(query, updateDoc);
      res.send(result);
    })

    app.patch('/booking/:email/:title/:review', async (req, res) => {
      const review = req.params.review;
      const email = req.params.email;
      const title = req.params.title;
      const query = { email: email, title: title, review: review }
      const updateRoom = req.body;
      console.log(updateRoom);
      const updateDoc = {
        $set: {
          review: updateRoom.review
        }
      }
      const result = await usersCollectionRoomBooking.updateOne(query, updateDoc);
      res.send(result);
    })

    app.get('/review', async (req, res) => {
      const cursor = usersCollectionRoomReview.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/review/:title', async (req, res) => {
      const title = req.params.title;
      const query = { title: title }
      const cursor = usersCollectionRoomReview.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/review', async (req, res) => {
      const room = req.body;
      console.log('new review', room);
      const result = await usersCollectionRoomReview.insertOne(room);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("Hotel is Running serverr");
})

app.listen(port, () => {
  console.log(`Ser running port: ${port}`);
}) 