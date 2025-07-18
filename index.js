const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

//1st user where pass not working
//hosenmddelwar51 this is user
//duE1gpQcfe2wPjdU this is pass


//V.V.I. //Start for getting this Code we need to click -> Clusters>Connect>Drivers>then > 3. Add your connection string into your application code
const uri = "mongodb+srv://delwar:IdeIQ6ZAgDBT6Tsr@cluster0.l9jk8d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    await client.connect();

    // Connect to the "usersDB" database and access its "userCollection" collection
    const database = client.db("usersDB");
    const userCollection = database.collection("users");
    // or we can write this in a single line :-
    // const userCollection = client.db("usersDB").collection("users");

    //for get(Read) data from MongoDB
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id;
      const query= {_id: new ObjectId(id)}
      const user =await userCollection.findOne(query);
      res.send(user);

    })


    //for post(Create) into MongoDB
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user);
      // Insert the defined document into the "userCollection" collection
      const result = await userCollection.insertOne(user);
      res.send(result);
    })


    //for PUT/PATCH(Update) in DB
    app.put('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const user=req.body;
      console.log(id,user);
      const filter={_id: new ObjectId(id)}
      const options={upsert:true}
      const updateUser={
        $set:{
          name:user.name,
          email:user.email,
        }
      }
      const result=await userCollection.updateOne(filter,updateUser,options);
      res.send(result);
    })



    // for Delete from MongoDB
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('please delete from DB', id);
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
//V.V.I. //END for getting this Code we need to click -> Clusters>Connect>Drivers>then > 3. Add your connection string into your application code

//2nd user where pass is working
// IdeIQ6ZAgDBT6Tsr     this is pass
// delwar               this is user



app.get('/', (req, res) => {
  res.send('SIMPLE CURD IS RUNNING');
})
app.listen(port, () => {
  console.log(`Simple Crud is running on Port:${port}`);
})