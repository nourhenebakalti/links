import React from "react";
import { useRouter } from "next/router";
import scrollToTop from "../../common/scrollToTo";

const ScrollToTop = () => {
  const router = useRouter();

  // Define the paths where ScrollToTop should appear
  const allowedRoutes = ["/", "/home", "/projects", "/contact","/project_details/"]; // Add your desired routes here
  const showScrollToTop = allowedRoutes.includes(router.pathname);

  React.useEffect(() => {
    if (showScrollToTop) {
      scrollToTop();
    }
  }, [showScrollToTop]);

  if (!showScrollToTop) return null; // Don't render anything if not in allowed routes

  return (
    <div className="progress-wrap cursor-pointer">
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ScrollToTop;


