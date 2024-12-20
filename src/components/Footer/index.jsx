/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Formik, Form, Field } from "formik";
import appData from "../../data/app.json";

const Footer = ({ noSubBG }) => {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendEmail = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <footer className={`footer-half ${noSubBG ? '':'sub-bg'} section-padding pb-0`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="cont">
              <div className="logo">
                <a href="#0">
                  <img src={`${appData.lightLogo}`} alt="Links Station logo" />
                </a>
              </div>
              <div className="con-info custom-font">
                <ul>
                  <a href="mailto:Contact@linksprod.com"> 
                    <span>Email : </span> Contact@linksprod.com 
                  </a>
                  <li>
                    <span>Address : </span> Avenue Alain Savary 2036 
                    Tunis, Tunisie
                  </li>
                  <li>
                    <span>Phone : </span> (+216) 21000950
                  </li>
                </ul>
              </div>
              <div className="social-icon">
                <h6 className="custom-font stit simple-btn">Follow Us</h6>
                <div className="social">
                  <a href="https://www.facebook.com/LinKs.tn" className="icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/links.station/" className="icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-5 offset-lg-2">
            <div className="subscribe mb-50">
            <div className="insta">
              {/* <h6 className="custom-font stit simple-btn">Instagram Post</h6> */}
              <div className="insta-gallary">
              {/* <a href="https://www.instagram.com/p/CnsEO8zB2I4/">
  <img src="/img/insta/1.jpg" alt="A snippet from an instagram post that showcases some work that Links Station did for one of their clients." style={{ border: '3px solid #6f42c1', borderRadius: '50%' }} />
</a>
<a href="https://www.instagram.com/p/Cnr8LruhY_C/">
  <img src="/img/insta/2.jpg" alt="A snippet from an instagram post that showcases some work that Links Station did for one of their clients." style={{ border: '3px solid #6f42c1', borderRadius: '50%' }} />
</a>
<a href="https://www.instagram.com/p/Cl1CRVKDqQ2/">
  <img src="/img/insta/3.jpg" alt="A snippet from an instagram post that showcases some work that Links Station did for one of their clients." style={{ border: '3px solid #6f42c1', borderRadius: '50%' }} />
</a> */}
              </div>
            </div>
            <br/>
              <h6 className="custom-font stit simple-btn">Start your journey</h6>
              <p>Enter your email and we will contact you!</p>

              <Formik
                initialValues={{
                  subscribe: "",
                }}
                onSubmit={async (values) => {
                  await sendEmail(500);
                  alert(JSON.stringify(values, null, 2));
                  // Reset the values
                  values.subscribe = "";
                }}
              >
                
                {({ errors, touched }) => (
                  <Form>
                    
                    <div className="form-group custom-font">
                      <Field
                        validate={validateEmail}
                        type="email"
                        name="subscribe"
                        placeholder="Your Email"
                      />
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                      <button className="cursor-pointer">Subscribe</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
