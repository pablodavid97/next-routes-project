import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_ROOT_USR}:${process.env.NEXT_PUBLIC_MONGO_ROOT_PWD}@cluster0.t7sqe.mongodb.net/${process.env.NEXT_PUBLIC_MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
};

export const getStaticProps = async (context) => {
    // fetch data from an API
    const { meetupId } = context.params;

    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_ROOT_USR}:${process.env.NEXT_PUBLIC_MONGO_ROOT_PWD}@cluster0.t7sqe.mongodb.net/${process.env.NEXT_PUBLIC_MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                image: selectedMeetup.image,
            },
        },
    };
};

const MeetupDetails = ({ meetupData }) => {
    return (
        <>
            <Head>
                <title>{meetupData.title}</title>
                <meta name='description' content={meetupData.description} />
            </Head>
            <MeetupDetail {...meetupData} />
        </>
    );
};

export default MeetupDetails;
