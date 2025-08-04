import { Link, Outlet } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/memory">Memory</Link>
          </li>
          <li>
            <Link to="/math">Math</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Home