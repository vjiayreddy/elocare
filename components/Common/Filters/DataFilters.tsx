import React from "react";
import Grid from "@mui/material/Grid";
import DropDownWithCheckBoxComponent from "../DropDowns/DropDownWithCheckBox";

const DataFiltersComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs></Grid>
      <Grid alignSelf="end" justifyContent="end" container item xs={4}>
        <Grid item xs={8}>
          <DropDownWithCheckBoxComponent
            id="sortby"
            placeholder="Sort By"
            options={["Alphabetical"]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataFiltersComponent;
