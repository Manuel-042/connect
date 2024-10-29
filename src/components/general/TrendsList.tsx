import Trend from './Trend';

function TrendsList() {
  const trends = [
    { location: "Music · Trending", title: "Lil Wayne", postCount: "10.8K" },
    { location: "Sports · Trending", title: "Barca", postCount: "214K" },
    { location: "Trending in Nigeria", title: "SMOOTH 29", postCount: "30.7K" },
    { location: "Trending in Politics", title: "UNRWA", postCount: "262K" },
    { location: "Trending in Nigeria", title: "Ogun", postCount: "8,065" },
    { location: "Sports · Trending", title: "Racism", postCount: "322K" },
  ];

  return (
    <div className="trends-list bg-black text-white rounded-lg overflow-hidden">
      {trends.map((trend, index) => (
        <Trend
          key={index}
          location={trend.location}
          title={trend.title}
          postCount={trend.postCount}
        />
      ))}
    </div>
  );
}

export default TrendsList;
