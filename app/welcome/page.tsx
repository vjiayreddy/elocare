"use client";
import MainLayoutComponent from "@/components/Layouts/MainLayout/MainLayout";
import PatientsAndRecordsSearchComponent from "@/components/Welcome/PatientsAndRecordsSearch/PatientsAndRecordsSearch";
import React from "react";

const WelcomePage = () => {
  return (
    <MainLayoutComponent>
      <PatientsAndRecordsSearchComponent />
    </MainLayoutComponent>
  );
};

export default WelcomePage;
