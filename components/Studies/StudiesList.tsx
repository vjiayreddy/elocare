import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import StudyCardComponent from "../Common/Cards/StudyCard/StudyCard";
import { useDispatch } from "react-redux";
import { setTemplateStudy } from "@/redux/reducers/projectFolderAndstudySlice";
import CreateStudyForm from "./CreateFolderForm/CreateStudyForm";

interface StudiesListComponentProps {
  studiesData: any[];
}

const StudiesListComponent = ({ studiesData }: StudiesListComponentProps) => {
  const dispatch = useDispatch();
  const [openStudyForm, setOpenStudyForm] = useState<boolean>();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography mb={2} mt={2} variant="subtitle1">
          Studies
        </Typography>
      </Grid>
      {!_.isEmpty(studiesData) ? (
        <Fragment>
          {studiesData.map((item: any, index: number) => (
            <Grid item xs={3} key={item?._id}>
              <StudyCardComponent
                id={item?._id as string}
                isEditable={item?.isEditable}
                key={item?._id}
                label={item?.label as string}
                title={item?.title as string}
                status="0 responses"
                iconType="STUDY"
                onRenameFolder={() => {
                  dispatch(
                    setTemplateStudy({
                      isUpdating: true,
                      ...item,
                    })
                  );
                  setOpenStudyForm(true);
                }}
              />
            </Grid>
          ))}
        </Fragment>
      ) : (
        <Grid
          item
          container
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          xs={12}
        >
          <Grid item>
            <img src="/images/no_studies.svg" />
          </Grid>
          <Grid item>
            <Typography textAlign="center" fontWeight={700} variant="body1">
              Your Binders will appear here
            </Typography>
            <Typography textAlign="center" fontWeight={500} variant="body2">
              Get started by adding your first binder
            </Typography>
          </Grid>
        </Grid>
      )}
      {openStudyForm && (
        <CreateStudyForm
          open={openStudyForm}
          onClose={() => {
            setOpenStudyForm(false);
          }}
          onCompleted={() => {}}
        />
      )}
    </Grid>
  );
};

export default StudiesListComponent;
