import Trend from './Trend';
import trends from "../../../data/trends.json"
import { Link, useLocation } from 'react-router-dom';

type TrendsProps = {
  location: string;
  title: string;
  postCount: string;
  category: string;
}

type TrendsListProps = {
  limit: number;
  data: TrendsProps[];
  variant?: "default" | "large"; 
}

function TrendsList({limit, data, variant = "default"}: TrendsListProps) {
  const more = trends.length > limit;
  const location = useLocation();

  const isTrendsPage = location.pathname === "/i/trends" || location.pathname === "/explore" ; 
  
  return (
    <div className="trends-list w-full dark:text-neutral-300 overflow-hidden">
      {data.slice(0, limit).map((trend, index) => (
        <Trend
          key={index}
          location={trend.location}
          title={trend.title}
          postCount={trend.postCount}
          variant={variant}
        />
      ))}
      {!isTrendsPage && more && <div className="px-3"><p><Link to="/i/trends" className="text-secondary-100">Show more</Link></p></div>}
    </div>
  );
}

export default TrendsList;
