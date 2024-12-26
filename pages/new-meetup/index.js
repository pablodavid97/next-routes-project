import Head from 'next/head.js';
import { useRouter } from 'next/router.js';
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (meetup) => {
        console.log('meetup: ', meetup);

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log('data: ', data);

        router.push('/');
    };

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                    name='description'
                    content='Add your own meetups and create amazing networking opportunities!'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />;
        </>
    );
};

export default NewMeetupPage;
