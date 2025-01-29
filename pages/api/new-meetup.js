// /api/new-meetup

import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_ROOT_USR}:${process.env.NEXT_PUBLIC_MONGO_ROOT_PWD}@cluster0.t7sqe.mongodb.net/${process.env.NEXT_PUBLIC_MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted successfully!' });
    }
};

export default handler;
