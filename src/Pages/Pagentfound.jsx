import { Link } from "react-router-dom";

function Pagentfound() {
  return (
    <div
      className="position-relative"
      style={{
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevents any overflow
      }}
    >
      {/* Image */}
      <img
        className="w-100 h-100"
        src="https://www.gpkumar.com/wp-content/uploads/2020/05/HTML-404-Page.gif"
        alt="Page Not Found"
        style={{
          objectFit: "cover", // Ensures the image covers the container
          objectPosition: "center", // Centers the image
        }}
      />
      {/* Overlay Content */}
      <div
        className="position-absolute top-50 start-50 translate-middle text-center text-white"
        style={{ zIndex: 10 }}
      >
        <h1>Looks Like You're Lost</h1>
        <Link to={'/'}>
          <button className="btn btn-success rounded-0 mt-4">GO HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default Pagentfound;
