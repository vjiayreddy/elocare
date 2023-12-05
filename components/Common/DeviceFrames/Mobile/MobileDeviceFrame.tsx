import React from "react";
import { DeviceFrameset, DeviceFramesetProps } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";


const StyledMobileDeviceFrameComponent=styled(Box)(({theme})=>({
   width:"100%",
   height:"100%",
   backgroundColor:theme.palette.common.black,
   display:"flex",
   flexDirection:"column",
   justifyContent:'center',
   alignItems:'center'
}))

interface MobileDeviceFrameComponentProps {
  deviceProps: DeviceFramesetProps;
}

const MobileDeviceFrameComponent = ({
  deviceProps,
}: MobileDeviceFrameComponentProps) => {
  return (
    <DeviceFrameset {...deviceProps}>
      <StyledMobileDeviceFrameComponent>
        <img alt="logo" width={150} src="/logos/elocare.svg" />
      </StyledMobileDeviceFrameComponent>
    </DeviceFrameset>
  );
};

export default MobileDeviceFrameComponent;
