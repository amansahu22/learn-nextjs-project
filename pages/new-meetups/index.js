//our-domain/new-meetups
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeet = () => {
  const router = useRouter();

  const onAddMeetupHandler = async (data) => {
    const response = await fetch("/api/new-meet", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Add - new meetups</title>
        <meta
          name="description"
          content="Create new meetup to connect with the world!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />;
    </>
  );
};

export default NewMeet;
