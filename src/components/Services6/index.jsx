import React from 'react';
import servicesData from '../../data/sections/services6.json';

const Services6 = () => {
  return (
    <section className="services section-padding bord-top">
      <div className="container">
        <div className="sec-head custom-font text-center">
          <h6>What we offer</h6>
          <h3>Services Overview</h3>
        </div>
        <div className="row">
          {
            servicesData.map((service, index) => (
              <div className="col-lg-4 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.3}s`} key={service.id}>
                <div className={`item simpl ${index !== servicesData.length - 1 ? 'md-mb50':''}`}>
                  <span className={`icon ${service.icon}`}></span>
                  <h5>{ service.title }</h5>
                  <h6>{ service.title2 }</h6>
                  <p>{ service.content }</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Services6