import React from "react";
import introData from "../../data/sections/intro.json";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination, Parallax, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Split from "../Split";
import fadeWhenScroll from "../../common/fadeWhenScroll";
import removeSlashFromPagination from "../../common/removeSlashFromPagination";

SwiperCore.use([Navigation, Pagination, Parallax, Autoplay]);

const IntroWithSlider1 = ({ sliderRef }) => {
  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    fadeWhenScroll();
    setTimeout(() => {
      setLoad(false);
      removeSlashFromPagination();
    }, 1000);
  }, []);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);

  return (
    <header
      ref={sliderRef}
      className="slider slider-prlx fixed-slider text-center"
    >
      <div className="swiper-container parallax-slider">

        <div
          className="bg-img valign"
          style={{ backgroundImage: `url(/img/slid/a2.jpg )` }}
        >
          {!load ? (
            <Swiper
              speed={1000}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              parallax={true}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              pagination={{
                type: "fraction",
                clickable: true,
                el: paginationRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.params.pagination.el = paginationRef.current;
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].childNodes[0].setAttribute(
                      "data-swiper-parallax",
                      0.75 * swiper.width
                    );
                  }

                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;

                  swiper.params.pagination.el = paginationRef.current;

                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();

                  swiper.pagination.destroy();
                  swiper.pagination.init();
                  swiper.pagination.update();

                  swiper.pagination.destroy();
                  swiper.pagination.init();
                  swiper.pagination.update();
                  
                });
              }}
              className="swiper-wrapper"
              slidesPerView={1}
            >
              {introData.map((slide) => (
                <SwiperSlide key={slide.id} className="swiper-slide">
                  <div
                    className="bg-img valign"
                    style={{ backgroundImage: `url(${slide.image})` }}
                    data-overlay-dark="3"
                  >
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className=" col-md-9">
                          <div className="caption center mt-50">
                            
                              <h2 className="words chars splitting">
                              {typeof slide.title === "object" ? (
                                  <>
                                    {slide.title.first} <br />
                                   
                                  </>
                                ) : (
                                  slide.title
                                )}
                              </h2>
                              <h1 className="words chars splitting">
                                {typeof slide.title === "object" ? (
                                  <>
                                    {slide.title.second}
                                  </>
                                ) : (
                                  slide.title
                                )}
                              </h1>
                          
                            
                            {slide?.content && <p>{slide.content}</p>}
                            <Link href="/contact">
                              <a className="btn-curve btn-lit mt-30">
                                <span>Get Started</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
          <div className="setone setwo">
            <div
              ref={navigationNextRef}
              className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
            >
              <i className="fas fa-chevron-right"></i>
            </div>
            <div
              ref={navigationPrevRef}
              className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
            >
              <i className="fas fa-chevron-left"></i>
            </div>
          </div>
          <div
            ref={paginationRef}
            className="swiper-pagination top botm custom-font"
          ></div>

          <div className="social-icon">
                  <a href="https://www.facebook.com/LinKs.tn" className="icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/links.station/" className="icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
        </div>
      </div>
    </header>
  );
};

export default IntroWithSlider1;
