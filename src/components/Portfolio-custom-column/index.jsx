import React from "react";
import Split from "../Split";
import Link from "next/link";
import axios from "axios";
import initIsotope from "../../common/initIsotope";

const PortfolioCustomColumn = ({ column, filterPosition, hideFilter, hideSectionTitle, }) => {
  
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [portfolio1Data, setProjects] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setPageLoaded(true);
    if (pageLoaded) {
      setTimeout(() => {
        initIsotope();
      }, 1000);
    }
  }, [pageLoaded]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        console.log("test", response);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Define inline styles for cover images
  const coverImageStyle = {
    width: '100%', 
    height: '550px', 
    objectFit: 'cover',
  };

  return (
    <section className="portfolio section-padding pb-70">
      {hideSectionTitle && (
        <div className="container">
          <div className="sec-head custom-font">
            <h6 className="wow fadeIn" data-wow-delay=".5s">
              Portfolio
            </h6>
            <h3 className="wow words chars splitting" data-splitting>
              Our Works.
            </h3>
            <span className="tbg text-right">Portfolio</span>
          </div>
        </div>
      )}

      <div className={`${column === 3 ? "container-fluid" : "container"}`}>
        <div className="row">
          {!hideFilter && (
            <div
              className={`filtering ${filterPosition === "center"
                  ? "text-center"
                  : filterPosition === "left"
                    ? "text-left"
                    : "text-right"
                } col-12`}
            >
              <div className="filter">
                <span data-filter="*" className="active">All</span>
                <span data-filter=".tourism">Tourism</span>
                <span data-filter=".restaurants">Restaurants</span>
                <span data-filter=".fashion">Fashion</span>
                <span data-filter=".events">Events</span>
                <span data-filter=".others">Others</span>
              </div>
            </div>
          )}

          <div className="gallery full-width">
            {portfolio1Data.map((item) => (
              <div
                key={item._id}
                className={`${column === 3
                    ? "col-lg-4 col-md-6"
                    : column === 2
                      ? "col-md-6"
                      : "col-12"
                  } items ${item.client_type.toLowerCase()} wow fadeInUp`}
                data-wow-delay=".4s"
              >
                <div className="item-img">
                  <Link href={'project_details/'+item._id || '#'}>
                    <a className="imago wow">
                      <img
                        src={'http://localhost:5000'+item.coverImage}
                        alt={item.title}
                        style={coverImageStyle} // Apply inline styles
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      />
                      <div className="item-img-overlay"></div>
                      <div className="item-hover">
                        <h5>{item.title}</h5>
                        <p>Explore Project</p>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="cont">
                  <h6>{item.title}</h6>
                  <span>
                    {item.categories.split(', ').map((tag, index) => (
                      <React.Fragment key={index}>
                        <Link href="/works4/works4-dark">{tag}</Link>
                        {index === item.categories.split(', ').length - 1 ? "" : ", "}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCustomColumn;
