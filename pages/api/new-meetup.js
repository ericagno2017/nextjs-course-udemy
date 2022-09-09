import {MongoClient} from "mongodb";
// /api/new-meetup

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        const uri = "mongodb+srv://testuser:mipassword@cluster0.7hbkps9.mongodb.net/?retryWrites=true&w=majority";
        const client = await MongoClient.connect(uri);
        const db = client.db("meetups");
        const meetupCollection = db.collection("meetups");
        const result = await meetupCollection.insertOne (data);
        console.log(result);
        client.close();

        res.status(201).json({
            message: "Meetup inserted!"
        })
    }
}

export default handler;