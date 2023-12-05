"use client";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import { StyledFindPatientRecordsBox } from "./styled";
import Grid from "@mui/material/Grid";
import IntoContentComponent from "@/components/Common/InfoContent/InfoContent";
import SearchInputComponent from "@/components/Common/SearchInput/SearchInput";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useState } from "react";

const PatientsAndRecordsSearchComponent = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`${APP_ROUTES.HOME}?patient=${searchTerm}`);
    }
  };

  return (
    <StyledFindPatientRecordsBox>
      <Box component="section" className="main_section">
        <Grid container direction="column">
          <Grid item xs={12}>
            <IntoContentComponent />
          </Grid>
          <Grid alignSelf="center" item xs={12}>
            <Image
              src="/images/welcome.png"
              alt="doctor"
              width={450}
              height={300}
              sizes="100vw"
            />
          </Grid>
          <Grid item alignSelf="center" xs={12}>
            <Box mt={4} mb={2}>
              <Typography textAlign="center" variant="body1">
                Find patients and access records for your managed protocols.
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs>
              <SearchInputComponent
                inputBaseProps={{
                  fullWidth: true,
                  onChange: (e) => {
                    setSearchTerm(e.target.value);
                  },
                  placeholder:
                    "Search for Patient Number, Patient Name, or IRB Number",
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </StyledFindPatientRecordsBox>
  );
};

export default PatientsAndRecordsSearchComponent;
