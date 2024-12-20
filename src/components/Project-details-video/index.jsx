import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import YouTube from 'react-youtube';
import 'react-modal-video/css/modal-video.css';
import React from 'react';

const ProjectDetailsVideo = ({ videoBackground, videoUrl }) => {
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.clear();
  }, []);

  // Safely check if videoUrl includes 'youtube.com'
  const isYouTubeVideo = videoUrl?.includes('youtube.com');

  return (
    <section>
      <h2 style={{ display: "none" }}> &nbsp; </h2>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        {isYouTubeVideo ? (
          // Use react-youtube component for YouTube videos
          <YouTube
            videoId={getYouTubeVideoId(videoUrl)}
            containerClassName="youtube-container" 
            opts={{
              width: "90%",
              playerVars: {
                height: "56.25vw", // Adjust aspect ratio
              },
            }}
          />
        ) : (
          // Use react-facebook EmbeddedVideo component for Facebook videos
          <FacebookProvider appId="your_facebook_app_id">
            <EmbeddedVideo
              href={videoUrl}
              width="90%"
              height="56.25vw" // Adjust aspect ratio
            />
          </FacebookProvider>
        )}
      </div>
    </section>
  );
};

// Function to extract the video ID from the YouTube video URL
const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

export default ProjectDetailsVideo;
