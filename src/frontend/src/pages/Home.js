import { FaGlobe } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home">
      <h1 className="center">
        Welcome to Worldwide Automotive Parts! <FaGlobe />
      </h1>
      <p className="center">
        Users please navigate to the login at the top of the page for the best
        shopping experience!
      </p>
      <p className="center">
        Once logged in, please navigate to the store to browse our products!
      </p>
    </div>
  );
};

export default Home;
