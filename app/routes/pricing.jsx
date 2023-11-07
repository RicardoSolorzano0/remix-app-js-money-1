// import { FaTrophy, FaHandshake } from 'react-icons/fa';
import marketingStyles from "../styles/marketing.css";
import PricingPlan from "../components/marketing/PricingPlan";

const PRICING_PLANS = [
  {
    id: "p1",
    title: "Basic",
    price: "Free forever",
    perks: ["1 User", "Up to 100 expenses/year", "Basic analytics"],
    icon: "none",
    // icon: FaHandshake
  },
  {
    id: "p2",
    title: "Pro",
    price: "$9.99/month",
    perks: ["Unlimited Users", "Unlimited expenses/year", "Detailed analytics"],
    icon: "none",
    // icon: FaTrophy
  },
];

export default function PricingPage() {
  return (
    <>
      <main id="pricing">
        <h2>Great Product, Simple Pricing</h2>
        <ol id="pricing-plans">
          {PRICING_PLANS.map((plan) => (
            <li key={plan.id} className="plan">
              <PricingPlan
                title={plan.title}
                price={plan.price}
                perks={plan.perks}
                icon={plan.icon}
              />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}

export function meta() {
  return [
    { title: "Pricing" },
    { name: "description", content: "See our pricing plans" },
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
