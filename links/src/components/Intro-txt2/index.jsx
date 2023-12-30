import { useEffect } from 'react';
import addParlx from '../../common/addParlx';
import Link from 'next/link';

const IntroTxt2 = () => {
  useEffect(() => {
    setTimeout(() => addParlx());
  }, []);

  return (
    <header className="slider simpl fixed-slider bg-img valign" style={{ backgroundImage: "url(/img/slid/a2.jpg)" }} data-overlay-dark="6">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="caption center mt-50">
              <h6>Links 0 to 1.</h6>
              <h1>Elevate Your Brand with LINKS STATION</h1>
              <p>Explore a world where results are not just expected, but guaranteed.</p>
              <a className="btn-curve btn-lit mt-40">
                <Link href="/contact/contact-dark">
                  <span>Get Started Now</span>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default IntroTxt2