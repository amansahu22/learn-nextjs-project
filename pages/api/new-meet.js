// api/new-meet
//and the code inside of the function runs only when the request is the POST request

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, description, address, image } = data;

    //if there is no database of name nextjsMeetups then it would create one
    const client = await MongoClient.connect(
      "mongodb+srv://aman22:aman22@cluster0.f2e0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    const db = client.db();
    //if there is no collection of meetupsCollection name then it will be created
    const meetupsCollection = db.collection("meetups");

    await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json({
      message: "New Meetup Inserted!",
    });
  }
}

export default handler;
