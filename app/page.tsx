"use client";

import Hero from "./Hero/page";
import React from "react";
import PowerCalculator from "./App_calkulator/page";
import Solar_benefits from "./Solar_benefits/page";
import Solar from "./Solar/page"
import Stats from "./Solar_numbers/page";

function Main() {
  return (
    <>
      <Hero />
      <PowerCalculator />
      <Solar_benefits />
      <Solar />
      <Stats />
    </>
  );
}

export default Main;


 

 