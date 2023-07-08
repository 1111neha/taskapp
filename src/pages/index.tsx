import dynamic from "next/dynamic";

const DynamicApp = dynamic(() => import("../components/App"), { ssr: false });

const HomePage: React.FC = () => {
  return <DynamicApp />;
};

export default HomePage;
