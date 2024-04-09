import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import YouTube from 'react-youtube';
import 'react-modal-video/css/modal-video.css';
import React from 'react';

const ProjectDetailsVideo = ({ videoBackground, videoUrl }) => {
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.clear();
  }, []);

  const isYouTubeVideo = videoUrl.includes('youtube.com');

  return (
    <section>
      <h2 style={{ display: "none" }}> &nbsp; </h2>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        {isYouTubeVideo ? (
          // Use react-youtube component for YouTube videos
          <YouTube
            videoId={getYouTubeVideoId(videoUrl)}
            containerClassName="youtube-container" // Add a custom class for styling
            opts={{
              width: "90%",
              playerVars: {
                // Set a fixed aspect ratio for horizontal rectangle (16:9)
                // Adjust height according to the aspect ratio
                // For example, if width is 90%, height should be 90% * (9/16)
                // You can adjust this value based on your preference
                height: "50.625vw", // 90% * (9/16)
                // Add any other player options here
              },
            }}
          />
        ) : (
          // Use react-facebook EmbeddedVideo component for Facebook videos
          <FacebookProvider appId="your_facebook_app_id">
            <EmbeddedVideo
              href={videoUrl}
              width="90%"
              // Set a fixed aspect ratio for horizontal rectangle (16:9)
              // Adjust height according to the aspect ratio
              // For example, if width is 90%, height should be 90% * (9/16)
              // You can adjust this value based on your preference
              height="50.625vw" // 90% * (9/16)
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
