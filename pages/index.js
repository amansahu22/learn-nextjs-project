//our-domain/
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>NextJs - Meetup app</title>
        <meta name="description" content="something about home page" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

//we can use this setStaticProps function inside of pages folder only it fatches data before the pre-rendering during build process and it fill our html code(source code) with the data during the pre-rendering only we need not two wait for second render cycle(in react we render our function component's jsx with initial state then useEffect runs and fetches data athen we update state and then our component renders again)

export async function getStaticProps() {
  //fetch data here and store it inside of props and pass that props object to our component so that we can access that data through props

  //we can create in route inside of api and then can fetch data from there but we know code inside of getStaticProps function is going to run on server and not in browser(client site) so it is safe and we can directly access our database here only this is a kind of alternate

  const client = await MongoClient.connect(
    "mongodb+srv://aman22:aman22@cluster0.f2e0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  //this will give us all the documents inside of meetups collection

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
        };
      }),
    },
    //revalidate is a property which takes number of seconds as value and it enables the automatic genration of this page after every specified seconds so that if new meetups were added then it can fetch them and generate this page again with latest data and why setting this property we need not to re-build and re-deploy our application again for latest data.
    revalidate: 1,
  };
}

//in a senerio where our data is changing multiple times in a second then revalidate can not be the best choice for us or if we want to have access to the incoming request n these scenerios we use another reverse function named "getServerSideProps"
//difference between getStaticProps(gsp) and getServerSideProps(gssp) is gsp runs while we run build command while gssp doesn't run while we build it runs before every incoming request so that i could guaranteed serve the latest data, but in that case we have to wait for data every time that's why if our data is not changing every multiple times in every second we should not use gssp.

// export async function getServerSideProps(context){

//const req=context.req;
//const res=context.res;

//   //fetch data here

//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
