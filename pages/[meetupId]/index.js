import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

const MeetUpDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetUpData.title}</title>
                <meta
                    name="description"
                    content={props.meetUpData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetUpData.image}
                title={props.meetUpData.title}
                address={props.meetUpData.address}
                description={props.meetUpData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {

    const uri = "mongodb+srv://testuser:mipassword@cluster0.7hbkps9.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    const db = client.db("meetups");
    const meetupCollection = db.collection("meetups");
    // perform actions on the collection object
    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
    client.close();

    return {
        fallback: "blocking",
        paths: meetups.map(meetup => ({
            params:
                {
                    meetupId: meetup._id.toString()
                }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupid = context.params.meetupId;

    const uri = "mongodb+srv://testuser:mipassword@cluster0.7hbkps9.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    const db = client.db("meetups");
    const meetupCollection = db.collection("meetups");
    // perform actions on the collection object
    const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupid)});

    client.close();

    return {
        props: {
            meetUpData: {
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                id: selectedMeetup._id.toString(),
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetUpDetails;