/* eslint-disable @next/next/no-img-element */
import React from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import Split from "../Split";

const NumbersWithVideo = ({ theme = "dark" }) => {
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    console.clear();
  }, []);
  return (
    <section className="block-sec">
      <div
        className=""
        style={{ backgroundImage: `url(/img/pattern${theme === 'light' ? '-light':''}.png)` }}
      >
        
        {typeof window !== "undefined" && (
          <ModalVideo
            channel="vimeo"
            autoplay
            isOpen={isOpen}
            videoId="902915020"
            onClose={() => setOpen(false)}
          />
        )}
        <div className="showreel">
          <div className="container">
            <div className="">
              <div className="">
                <div className="video-box">
                  <div className="tit-text">
                    <Split>
                      <h3 className="wow words chars splitting" data-splitting>
                        Showreel
                      </h3>
                    </Split>
                  </div>
                  <div className="">
                    <div className="img">
                      <img src="/img/thumbnail.jpg" alt="" />
                    </div>
                    <div className="vid-icon">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(true);
                        }}
                        className="vid"
                        href="https://player.vimeo.com/video/902915020?h=1869600352"
                      >
                        <div className="vid-butn">
                          <span className="icon">
                            <i className="fas fa-play"></i>
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersWithVideo;
