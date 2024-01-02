import React from 'react';
import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import 'react-modal-video/css/modal-video.css';

const ProjectDetailsVideo = ({ videoBackground, videoUrl }) => {
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.clear();
  }, []);

  const facebookVideoId = getFacebookVideoId(videoUrl);

  return (
    <section>
      <h2 style={{ display: 'none' }}> &nbsp; </h2>
      <div className="container-fluid" style={{ textAlign: 'center' }}>
        {/* Use react-facebook EmbeddedVideo component */}
        {facebookVideoId && (
          <FacebookProvider appId="your_facebook_app_id">
            <EmbeddedVideo href={videoUrl} width={1000} />
          </FacebookProvider>
        )}
      </div>


    </section>
  );
};

// Function to extract the video ID from the Facebook video URL
const getFacebookVideoId = (url) => {
  const match = url.match(/\/(\d+)\/?/);
  return match ? match[1] : null;
};

export default ProjectDetailsVideo;
