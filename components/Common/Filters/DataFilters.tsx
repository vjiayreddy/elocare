import React from "react";
import Grid from "@mui/material/Grid";
import DropDownWithCheckBoxComponent from "../DropDowns/DropDownWithCheckBox";

const DataFiltersComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2} xs={8}>
        <Grid item xs={3}>
          <DropDownWithCheckBoxComponent
            id="createdBy"
            placeholder="Created by"
            options={["You"]}
          />
        </Grid>
        <Grid item xs={3}>
          <DropDownWithCheckBoxComponent
            id="status"
            placeholder="Status"
            options={["Draft", "Completed"]}
          />
        </Grid>
        <Grid item xs={3}>
          <DropDownWithCheckBoxComponent
            id="tyoe"
            placeholder="Type"
            options={["Protocol-Required", "Supplemental"]}
          />
        </Grid>
      </Grid>
      <Grid alignSelf="end" justifyContent="end" container item xs={4}>
        <Grid item xs={6}>
          <DropDownWithCheckBoxComponent
            id="sortby"
            placeholder="Alphabetical"
            options={["Alphabetical"]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataFiltersComponent;
