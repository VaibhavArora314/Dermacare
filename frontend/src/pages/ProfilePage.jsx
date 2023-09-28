import History from "../Components/History";
import UserDetails from "../Components/UserDetails";

const ProfilePage = () => {
  return (
    <>
      <div
        className="profile-parent"
        style={{
          margin: "2rem",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <UserDetails />
        <History />
      </div>
    </>
  );
};

export default ProfilePage;
