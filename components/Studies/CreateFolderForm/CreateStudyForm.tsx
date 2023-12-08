import LoadingButtonComponent from "@/components/Common/Buttons/LoadingButton";
import ClosedDialogComponent from "@/components/Common/Dialogs/ClosedDialog/ClosedDialog";
import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import {
  useCreateStudyMutation,
  useUpdateStudyMutation,
} from "@/redux/api/studiesApi";
import { CREATE_NEW_STUDY, PARKINSON_DISEASE } from "@/utils/constants";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes";

interface CreateStudyFormProps {
  onCompleted: () => void;
  open?: any;
  onClose: () => void;
}

const CreateStudyForm = ({
  open,
  onClose,
  onCompleted,
}: CreateStudyFormProps) => {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [createStudy, { isLoading: isLoadingCreateStudy }] =
    useCreateStudyMutation();
  const [updateStudy, { isLoading: isLoadingUpdateStudy }] =
    useUpdateStudyMutation();
  const { selectTemplateStudy } = useSelector(
    (state: any) => state?.projectFolderAndstudySlice
  );
  const { data: session } = useSession();
  const onSubmit = async (data: any) => {
    try {
      if (selectTemplateStudy?.isUpdating) {
        const response = (await updateStudy({
          studyId: selectTemplateStudy?._id as string,
          title: data?.title as string,
        })) as any;
        if (response?.data.status === "success" && response?.data?.data) {
          toast.success("Assessment updated successfully");
        }
      } else {
        const response = (await createStudy({
          title: data?.title,
          assessmentTemplateId: selectTemplateStudy?.assessmentTemplateId,
          doctorId: session?.user?.id as string,
          projectId: selectTemplateStudy?.projectId,
          isDoctorLocked: selectTemplateStudy?.isDoctorLocked,
          description: selectTemplateStudy?.description,
          isEditable: selectTemplateStudy?.isEditable,
          isAsNeededAssessment: selectTemplateStudy?.isAsNeededAssessment,
        })) as any;
        if (response?.data.status === "success" && response?.data?.data) {
          toast.success("Assessment created successfully");
          router.push(
            `${APP_ROUTES.All_STUDIES}/${response?.data?.data?.study?._id}?isEditable=${response?.data?.data?.study?.isEditable}`
          );
        }
      }
    } catch (error) {}
    onCompleted();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <ClosedDialogComponent
      modelTitle={CREATE_NEW_STUDY}
      open={open}
      onClickCloseIcon={onClose}
      footer={
        <Grid container spacing={2}>
          <Grid item md={6}>
            <LoadingButtonComponent
              onClick={onClose}
              btnProps={{
                fullWidth: true,
                color: "inherit",
                variant: "outlined",
              }}
            >
              Cancel
            </LoadingButtonComponent>
          </Grid>
          <Grid item md={6}>
            <LoadingButtonComponent
              showLoading={isLoadingCreateStudy || isLoadingUpdateStudy}
              onClick={handleSubmit(onSubmit)}
              btnProps={{
                fullWidth: true,
              }}
            >
              {selectTemplateStudy?.isUpdating
                ? "Update Assessment"
                : "Create new assessment"}
            </LoadingButtonComponent>
          </Grid>
        </Grid>
      }
    >
      <Grid container>
        <Grid item xs={12}>
          <Box mb={1}>
            <FormLabel>Assessment Name</FormLabel>
          </Box>
          <TextInputFieldComponent
            id="stydyTitle"
            name="title"
            label=""
            defaultValue={selectTemplateStudy?.title || ""}
            control={control}
            rules={{
              required: "Study Name is required",
            }}
            textFieldProps={{
              placeholder: "Enter study name",
            }}
          />
        </Grid>
      </Grid>
    </ClosedDialogComponent>
  );
};

export default CreateStudyForm;
