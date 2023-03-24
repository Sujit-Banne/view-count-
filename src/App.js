import { useState, useEffect } from 'react';
import './ImageViewer.css'
function App() {
  const [viewCount, setViewCount] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    // Load view count from localStorage on component mount
    const savedViewCount = localStorage.getItem('viewCount');
    if (savedViewCount) {
      setViewCount(parseInt(savedViewCount));
    } else {
      // Set initial view count to 0 if not already set in localStorage
      setViewCount(0);
    }
  }, []);

  function handleVideoClick() {
    // Increment view count and save to localStorage
    const newViewCount = viewCount + 1;
    setViewCount(newViewCount);
    localStorage.setItem('viewCount', newViewCount);

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
