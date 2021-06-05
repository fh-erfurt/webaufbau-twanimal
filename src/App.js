import "./assets/fonts/Inter/font.css";
import "./App.css";
import Navigation from "./components/Navigation";
import ProfileCard from "./components/ProfileCard";
import PostContent from "./components/PostContent";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      {/* 
      <header className="App-header">
        <Navigation />
      </header>

      <div className="homepage">
        <div className="postContent">
          <PostContent />
        </div>
        <div className="profileCard">
          <ProfileCard />
        </div>
      </div> 
      */}
      <Login />
    </div>
  );
}

export default App;
