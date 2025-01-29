import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList.js';
import { MongoClient } from 'mongodb';

export const getStaticProps = async () => {
    // fetch data from an API
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_ROOT_USR}:${process.env.NEXT_PUBLIC_MONGO_ROOT_PWD}@cluster0.t7sqe.mongodb.net/${process.env.NEXT_PUBLIC_MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    const processedMeetups = meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
    }));

    return {
        props: {
            meetups: processedMeetups,
        },
        revalidate: 10,
    };
};

// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// };

const HomePage = ({ meetups }) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    );
};

export default HomePage;
