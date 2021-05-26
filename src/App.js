import "./assets/fonts/Inter/font.css";
import "./App.css";
import "./assets/css/components/homepage.css";
import Navigation from "./components/Navigation";
import ProfileCard from "./components/ProfileCard";
import PostContent from "./components/PostContent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <div className="Homepage">
        <div className="postContent">
          <PostContent />
        </div>
        <div className="profileCard">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}

export default App;
