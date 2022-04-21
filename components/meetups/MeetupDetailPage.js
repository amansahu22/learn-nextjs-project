import styles from "./MeetupDetailPage.module.css";

const MeetupDetailPage = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.img} alt="Meetup" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetupDetailPage;
