import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButtonComponent from "@/components/Common/Buttons/LoadingButton";
import QuestionListComponent from "@/components/Common/Lists/QuestionsList/QuestionList";
import MobileDeviceFrameComponent from "@/components/Common/DeviceFrames/Mobile/MobileDeviceFrame";
import { IconButton } from "@mui/material";
import LaptopFrameComponent from "@/components/Common/DeviceFrames/Laptop/Laptop";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/routes";
import { useDispatch } from "react-redux";
import CreateStudyForm from "../CreateFolderForm/CreateStudyForm";
import { setTemplateStudy } from "@/redux/reducers/projectFolderAndstudySlice";
import { PARKINSON_DISEASE } from "@/utils/constants";

const StyledDeviceFrameView = styled(Box)(({ theme }) => ({
  minHeight: 700,
  backgroundColor: theme.palette.grey[200],
  padding: 30,
  display: "flex",
  flexDirection: "column",
  "& .__header": {
    height: 40,
  },
  "& .__main_view": {
    flexGrow: 1,
    ovevflow: "auto",
    paddingTop: 50,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
  },
  "& .__footer": {
    height: 40,
  },
}));

interface DeviceFrameViewProps {
  questions: any;
}

const DeviceFrameView = ({ questions }: DeviceFrameViewProps) => {
  const [deviceFrame, setDeviceFrame] = useState<string>("mobile");
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const binderId = searchParams.get("binderId");


  return (
    <StyledDeviceFrameView>
      <Box component="div" className="__header">
        {questions && (
          <Grid container>
            <Grid item xs>
              <Typography variant="body1">
                {questions?.assessmentTemplateData?.title}
              </Typography>
            </Grid>
            <Grid item>
              <LoadingButtonComponent
                btnProps={{
                  disabled:
                    questions?.assessmentTemplateId === PARKINSON_DISEASE,
                }}
                onClick={() => {
                  dispatch(
                    setTemplateStudy({
                      assessmentTemplateId: questions?.assessmentTemplateId,
                      title: questions?.assessmentTemplateData?.title,
                      isDoctorLocked:
                        questions?.assessmentTemplateData?.isDoctorLocked,
                      description:
                        questions?.assessmentTemplateData?.description,
                      projectId: binderId,
                      isEditable: questions?.assessmentTemplateData.isEditable,
                    })
                  );
                  setOpenModel(true);
                }}
              >
                Use this template
              </LoadingButtonComponent>
            </Grid>
          </Grid>
        )}
      </Box>
      <Box component="div" className="__main_view">
        <Grid container>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            md={8}
          >
            {deviceFrame === "mobile" && (
              <MobileDeviceFrameComponent
                deviceProps={{
                  device: "HTC One",
                  color: "black",
                  height: 450,
                  width: 300,
                }}
              />
            )}

            {deviceFrame === "tab" && (
              <LaptopFrameComponent
                deviceProps={{
                  device: "iPad Mini",
                  color: "black",
                  height: 450,
                  width: 400,
                }}
              />
            )}
          </Grid>
          <Grid item container alignItems="center" justifyContent="end" md={4}>
            <Grid item>
              {questions?.assessmentTemplateQuestionData?.length > 0 && (
                <QuestionListComponent
                  questionData={questions?.assessmentTemplateQuestionData}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box component="div" className="__footer">
        <Grid container>
          <Grid item container justifyContent="center" md={8}>
            <Grid item>
              <IconButton onClick={() => setDeviceFrame("tab")}>
                <img alt="laptop" src="/icons/laptop.svg" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setDeviceFrame("mobile")}>
                <img alt="mobile" src="/icons/phone.svg" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <img alt="laptop" src="/icons/link.svg" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item md={4} container justifyContent="end">
            <Grid item>
              <LoadingButtonComponent
                btnProps={{
                  size: "small",
                  color: "inherit",
                  sx: {
                    fontSize: 14,
                  },
                  startIcon: <img alt="eye-off" src="/icons/eye-off.svg" />,
                }}
                onClick={() => {}}
              >
                Hide questions
              </LoadingButtonComponent>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openModel && (
        <CreateStudyForm
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
          onCompleted={() => {}}
        />
      )}
    </StyledDeviceFrameView>
  );
};

export default DeviceFrameView;
