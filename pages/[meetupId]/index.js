//our-domain/some-dynamic-meet-rendering
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetailPage from "../../components/meetups/MeetupDetailPage";
import Head from "next/head";

const ParticularMeet = (props) => {
  // const router = useRouter();
  // const { meetupId } = router.query;

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetailPage
        img={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </>
  );
};

//note:- while using getStaticProps method inside of a dynamic page we need to export getStaticPaths method as well

export async function getStaticPaths() {
  //we will not hardcode all possible id here, we will fetch all the ids and then loop over them
  const client = await MongoClient.connect(
    "mongodb+srv://aman22:aman22@cluster0.f2e0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const response = await meetupsCollection.find({}, { _id: 1 }).toArray();
  //give us _id of all the documents inside of meetups collections
  client.close();

  return {
    fallback: false, //if any request for that id which is not define here came(if fallback:false then it will show 404 page and if fallback:true then it will generate dynamic page for that on server)

    paths: response.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

//getStaticProps function to fetch data related to this dynamic route page
//we can access id from url using useRouter hook but remember we cannot use hooks outside of react component
//but we have context parameter passed to getStaticProps by nextJS although it doesn't have access to req and res here

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  //fetch data here
  const client = await MongoClient.connect(
    "mongodb+srv://aman22:aman22@cluster0.f2e0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default ParticularMeet;
