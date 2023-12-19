import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { Fragment, useState } from "react";
import _ from "lodash";
import FolderCardComponent from "../Common/Cards/FolderCard/FolderCard";
import { useDispatch } from "react-redux";
import { setProjectFolder } from "@/redux/reducers/projectFolderAndstudySlice";
import CreateFolderForm from "./CreateFolderForm/CreateFolderForm";

interface BindersListComponentProps {
  bindersData: any[];
}

const BindersListComponent = ({ bindersData }: BindersListComponentProps) => {
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState<boolean>(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography mb={2} mt={2} variant="subtitle1">
          Binders
        </Typography>
      </Grid>
      {!_.isEmpty(bindersData) ? (
        <Fragment>
          {bindersData.map((item: any, index: number) => (
            <Grid item xs={3} key={item?._id}>
              <FolderCardComponent
                folderId={item?._id as string}
                key={item?._id}
                onRenameFolder={() => {
                  dispatch(setProjectFolder(item));
                  setOpenModel(true);
                }}
                title={item?.title as string}
                status={
                  item?.studyDataCount?.studyCount
                    ? `${item?.studyDataCount?.studyCount} Studies`
                    : "0 Studies"
                }
                iconType="FOLDER"
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
      {openModel && (
        <CreateFolderForm
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
          onCompleted={() => {
            setOpenModel(false);
          }}
        />
      )}
      {/* {openStudyForm && (
        <CreateStudyForm
          open={openStudyForm}
          onClose={() => {
            setOpenStudyForm(false);
          }}
          onCompleted={() => {}}
        />
      )} */}
    </Grid>
  );
};

export default BindersListComponent;
