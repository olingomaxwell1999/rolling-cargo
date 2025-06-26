import React from "react";
import Banner from "../shared/Components/Banner/Banner";
import { costEstimatorBannerContent } from "@/data/data";
import FreightCalculator from "../shared/Components/Freightsection/Freightsection";

const page = () => {
  return (
    <div>
      <Banner
        content={costEstimatorBannerContent}
        imageSrc="CostEstimator.jpg"
      />
      <FreightCalculator />
    </div>
  );
};

export default page;
