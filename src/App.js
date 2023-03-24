import { useState, useEffect } from 'react';
import './ImageViewer.css'

function App() {
  const [viewCount, setViewCount] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    fetch('https://view-count-backend.onrender.com/viewcount')
      .then(res => res.json())
      .then(data => {
        setViewCount(data.count);
      })
      .catch(err => console.log(err));
  }, []);

  function handleVideoClick() {
    // Increment view count on the backend and update locally
    fetch('https://view-count-backend.onrender.com/viewcount', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setViewCount(data.count);
      })
      .catch(err => console.log(err));

    // Open video player on the right side of the screen
    setVideoOpen(true);
  }

  function handleCloseVideo() {
    // Close video player
    setVideoOpen(false);
  }

  return (
    <div className="App">
      <div className="video-container">
        <div className="thumbnail-container">
          <img
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            alt="Video Thumbnail"
            onClick={handleVideoClick}
          />
          <p>View count: {viewCount}</p>
        </div>
        {videoOpen && (
          <div className="video-player">
            <video
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
            />
            <button onClick={handleCloseVideo}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
