import { Link } from "@remix-run/react";
import marketingStyles from "../styles/marketing.css";
// import { FaArrowRight, FaDollarSign, FaChartBar } from 'react-icons/fa';

export default function Index() {
  return (
    <main>
      <section className="marketing-section">
        <header>
          icondollarsign
          {/* <FaDollarSign /> */}
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-image">
            <img
              src="images/expenses-management.jpg"
              alt="A list of expenses."
            />
          </div>
          <div className="marketing-explanation">
            <p>Manage your expenses in one central place.</p>
            <p>
              <Link className="cta" to="/expenses">
                <span>Get Started</span>
                iconarrowright
                {/* <FaArrowRight /> */}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="marketing-section">
        <header>
          iconchartbar
          {/* <FaChartBar /> */}
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <p className="marketing-explanation">
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
          <div className="marketing-image">
            <img src="images/expenses-chart.jpg" alt="A demo bar chart." />
          </div>
        </div>
      </section>
    </main>
  );
}

export function meta() {
  return [
    { title: "Paginate Index" },
    { name: "description", content: "Manage your expenses with ease" },
    // { property: "og:title", content: "..." },

    // // you can now add SEO related <links>
    // { tagName: "link", rel: "canonical", href: "..." },

    // // and <script type=ld+json>
    // {
    //   "script:ld+json": {
    //     some: "value",
    //   },
    // },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600", //60 minutes
  };
}
