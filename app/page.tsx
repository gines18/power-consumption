"use client";

import Hero from "./Hero/page";
import React from "react";
import PowerCalculator from "./App_calkulator/page";
import Solar_benefits from "./Solar_benefits/page";
import Solar from "./Solar/page"
import Stats from "./Solar_numbers/page";
import Advantages from "./Advantages/page"
import Steps from "./Steps/page";
import Contact from "./Contact/page";

function Main() {
  return (
    <>
      <Hero />
      <PowerCalculator />
      <Solar_benefits />
      <Advantages />
      <Solar />
      <Steps />
      <Stats />
      <Contact />
    </>
  );
}

export default Main;


 

 