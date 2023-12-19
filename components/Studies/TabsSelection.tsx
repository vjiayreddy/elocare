import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

interface TabsSelectionComponentProps {
  tabIndex: number;
  onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
}

const TabsSelectionComponent = ({
  tabIndex,
  onChange,
}: TabsSelectionComponentProps) => {
  return (
    <Tabs value={tabIndex} onChange={onChange}>
      <Tab
        label="Questions"
        icon={
          <img
            alt="question_badge"
            src={
              tabIndex === 0
                ? "/icons/question_badge_2.svg"
                : "/icons/question_badge_1.svg"
            }
          />
        }
        iconPosition="end"
      />
      <Tab
        label="Audience"
        icon={
          <img
            alt="question_badge"
            src={
              tabIndex === 1 ? "/icons/audience_2.svg" : "/icons/audience_1.svg"
            }
          />
        }
        iconPosition="end"
      />
    </Tabs>
  );
};

export default TabsSelectionComponent;
