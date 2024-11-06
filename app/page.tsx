"use client";

import Hero from "./Hero/page";
import React from "react";
import PowerCalculator from "./App_calkulator/page";
import Solar_benefits from "./Solar_benefits/page";
// import Solar from "./Solar/page"
import Stats from "./Solar_numbers/page";
import Advantages from "./Advantages/page"
import Steps from "./Steps/page";
import Contact from "./Contact/page";
import Info from "./Info/page";
// import Meeting from "./Appointment/page";
// import AppointmentScheduler from './Tailwind_form/page'
// import Payment from "./Payments/page";
// import Baner from "./Top_baner/page";

function Main() {
  return (
    <>
      <Hero />
      <PowerCalculator />
      <Solar_benefits />
      <Advantages />
      {/* <Solar /> */}
      <Steps />
      <Info />
      <Stats />
      {/* <Meeting /> */}
      {/* <AppointmentScheduler />   */}
      {/* <Payment /> */}
      {/* <Baner /> */}
      <Contact />
    </>
  );
}

export default Main;


 

 