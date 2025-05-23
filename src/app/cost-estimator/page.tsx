import React from "react";
import FreightSection from "../shared/Components/Freightsection/Freightsection";
import Banner from "../shared/Components/Banner/Banner";
import { costEstimatorBannerContent } from "@/data/data";

const page = () => {
  return (
    <div>
      <Banner
        content={costEstimatorBannerContent}
        imageSrc="CostEstimator.jpg"
      />
      <FreightSection />
    </div>
  );
};

export default page;
