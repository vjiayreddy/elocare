import LoadingButtonComponent from "@/components/Common/Buttons/LoadingButton";
import ClosedDialogComponent from "@/components/Common/Dialogs/ClosedDialog/ClosedDialog";
import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import {
  useCreateFolderMutation,
  useUpdateFolderMutation,
} from "@/redux/api/studiesApi";
import { CREATE_NEW_PROJECT_FOLDER } from "@/utils/constants";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface CreateFolderFormProps {
  onCompleted: () => void;
  open?: any;
  onClose: () => void;
}

const CreateFolderForm = ({
  open,
  onClose,
  onCompleted,
}: CreateFolderFormProps) => {
  const { control, handleSubmit, reset } = useForm();
  const [createFolder, { isLoading }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: isLoadingUpdatedFolder }] =
    useUpdateFolderMutation();
  const { selectedFolder } = useSelector(
    (state: any) => state?.projectFolderAndstudySlice
  );
  const { data: session } = useSession();
  const onSubmit = async (data: any) => {
    try {
      if (selectedFolder) {
        const response = (await updateFolder({
          title: data?.title,
          folderId: selectedFolder?._id,
        })) as any;
        if (response?.data?.status === "success" && response?.data?.data) {
          toast.success("Binder Updated Successfully");
        }
      } else {
        const response = (await createFolder({
          title: data?.title,
          doctorId: session?.user?.id as string,
        })) as any;

        if (response?.data) {
          toast.success("Binder Created Successfully");
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
      modelTitle={CREATE_NEW_PROJECT_FOLDER}
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
              showLoading={isLoading || isLoadingUpdatedFolder}
              onClick={handleSubmit(onSubmit)}
              btnProps={{
                fullWidth: true,
                disabled: isLoading,
              }}
            >
              {selectedFolder ? "Update Binder" : "Create Binder"}
            </LoadingButtonComponent>
          </Grid>
        </Grid>
      }
    >
      <Grid container>
        <Grid item xs={12}>
          <Box mb={1}>
            <FormLabel>Binder Name</FormLabel>
          </Box>
          <TextInputFieldComponent
            id="folderTitle"
            name="title"
            label=""
            defaultValue={selectedFolder?.title || ""}
            control={control}
            rules={{
              required: "Binder name is required",
            }}
            textFieldProps={{
              placeholder: "Enter binder name",
            }}
          />
        </Grid>
      </Grid>
    </ClosedDialogComponent>
  );
};

export default CreateFolderForm;
