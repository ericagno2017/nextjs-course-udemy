import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";


const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetUpData) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetUpData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log(data);

        router.push("/");

    }

    return (
        <Fragment>
            <Head>
                <title>Add a new MeetUp</title>
                <meta
                    name="description"
                    content="Add your own meetups, create amazing networking opportunities"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}

export default NewMeetupPage;