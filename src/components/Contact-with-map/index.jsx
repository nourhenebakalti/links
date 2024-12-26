import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from 'axios';
import Split from '../Split';

const ContactWithMap = ({ theme = "dark" }) => {
  const messageRef = React.useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    workType: [],
    services: [],
    domain: [],
    priorities: [],
  });

  // Track selected options
  const [selectedOptions, setSelectedOptions] = useState({
    workType: [],
    services: [],
    domain: [],
    priorities: [],
  });

  const steps = [
    {
      title: "Do any of these describe your work?",
      subtitle: "Select any that apply",
      options: [
        "At a school",
        "At a boot camp",
        "At an agency",
        "At a company",
        "Founder",
        "Freelancer",
        "Other"
      ],
      field: "workType"
    },
    {
      title: "What type of service are you looking for?",
      subtitle: "Select your needs",
      options: ["Consultation", "Technical Support", "Training", "Other"],
      field: "services"
    },
    {
      title: "What is your field of activity?",
      subtitle: "Choose your sector",
      options: ["Education", "E-commerce", "Health", "Other"],
      field: "domain"
    },
    {
      title: "What are your priorities?",
      subtitle: "Select your main criteria",
      options: ["Speed", "Quality", "Customization", "Cost", "Other"],
      field: "priorities"
    },
    {
      title: "Final Step: Enter Your Details",
      subtitle: "Please provide your contact information",
      inputs: [
        { name: "name", placeholder: "Name", type: "text", required: true },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "message", placeholder: "Message", type: "textarea", required: true }
      ]
    }
  ];

  const handleOptionSelect = (option, field) => {
    setSelectedOptions(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option],
    }));
    
    setFormData(prev => ({
      ...prev,
      [field]: selectedOptions[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const jsonData = JSON.stringify(formData);
    const res = await axios.post('/api/send-mail', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res) return;

    messageRef.current.innerText = "Your Message has been successfully sent. We will contact you soon.";
    
    setFormData({ name: "", email: "", message: "", workType: [], services: [], domain: [], priorities: [] });
    
    setTimeout(() => {
      messageRef.current.innerText = "";
    }, 8000);
  };

  const currentStepData = steps[currentStep];

  return (
    <>
      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="form md-mb50">
                <h4 className="extra-title mb-50">Get In Touch.</h4>

                <div className="messages" ref={messageRef}></div>

                <div>
                  <h2 className="text-3xl font-bold mb-2">{currentStepData.title}</h2>
                  <p className="text-gray-600">{currentStepData.subtitle}</p>
                  
                  {currentStepData.inputs ? (
                    <Formik
                      initialValues={formData}
                      onSubmit={handleNext}
                    >
                      {({ values }) => (
                        <Form id="contact-form">
                          {currentStepData.inputs.map((input) => (
                            <div className="form-group" key={input.name}>
                              {input.type === "textarea" ? (
                                <Field
                                  as="textarea"
                                  name={input.name}
                                  placeholder={input.placeholder}
                                  rows="4"
                                  required={input.required}
                                />
                              ) : (
                                <Field
                                  type={input.type}
                                  name={input.name}
                                  placeholder={input.placeholder}
                                  required={input.required}
                                />
                              )}
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <button 
                              type="button" 
                              onClick={handleBack} 
                              disabled={currentStep === 0} 
                              style={{ borderRadius: '30px', padding: '10px 20px' ,marginRight: '10px' }} // Inline styles for rounding
                            >
                              Back
                            </button>
                            <button 
                              type="submit" 
                              style={{ borderRadius: '30px', backgroundColor: '#714ed6', color: 'white', padding: '10px 20px' }} // Inline styles for rounding
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {currentStepData.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option, currentStepData.field)}
                          style={{
                            borderRadius: '30px',
                            padding: '10px 20px',
                            border: '2px solid lightgray',
                            backgroundColor: selectedOptions[currentStepData.field].includes(option) ? '#714ed6' : 'transparent',
                            color: 'white',
                            margin: '6px',
                          }}
                        >
                          {option}
                        </button>
                      ))}
                      <div className="flex justify-between">
                        <button 
                          type="button" 
                          onClick={handleBack} 
                          disabled={currentStep === 0} 
                          style={{ borderRadius: '30px', padding: '10px 20px', marginTop: '50px', marginRight: '10px' }} // Inline styles for rounding
                        >
                          Back
                        </button>
                        
                        <button 
                          onClick={handleNext} 
                          style={{ borderRadius: '30px', backgroundColor: '#714ed6', color: 'white', padding: '10px 20px', marginTop: '50px' }} // Inline styles for rounding
                        >
                          {currentStep === steps.length - 1 ? "Finish" : "Next"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="cont-info">
                <h4 className="extra-title mb-50">Contact Info.</h4>
                
                <h3 className="custom-font wow" data-splitting>
                  Let&apos;s Talk.
                </h3>
                
                <div className="item mb-40">
                  <h5>
                    <a href="mailto:Contact@linksprod.com">Contact@linksprod.com</a>
                  </h5>
                  <h5>(+216) 21000950</h5>
                </div>
                
                <h3 className="custom-font wow" data-splitting>
                  Visit Us.
                </h3>
               
                <div className="item">
                  <h6>
                    Avenue Alain Savary 2036 
                    <br />
                    Tunis, Tunisie
                  </h6>
                </div>
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
        </div>
      </section>
      <footer className="footer-half sub-bg">
        <div className="container">
        </div>
      </footer>
    </>
  );
};

export default ContactWithMap;
