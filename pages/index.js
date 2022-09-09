import {MongoClient} from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import {Fragment} from "react";

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React MeetUps</title>
                <meta
                    name="description"
                    content="Browse a huge list of higly active React Meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}


// export async function getServerSideProps(context){
//     const req = context.req;
//     const resp = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }


//es solo para los componentes en PAGES, no sirve en ningún otro componente.
export async function getStaticProps() {
    //fetch data from an API

    const uri = "mongodb+srv://testuser:mipassword@cluster0.7hbkps9.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    const db = client.db("meetups");
    const meetupCollection = db.collection("meetups");
    //     // perform actions on the collection object
    const meetups = await meetupCollection.find().toArray();

    client.close();


    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

export default HomePage;