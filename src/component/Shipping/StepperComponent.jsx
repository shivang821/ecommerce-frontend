import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { Typography } from '@mui/material';
import './stepper.css'
const StepperComponent = ({ activeState }) => {
  const stepStyle = {
    boxSizing: "border-box"
  }
  const steps = [
    { icon: <LocalShippingOutlinedIcon />, label:<Typography>Shipping Details</Typography> },
    { icon: <LibraryAddCheckOutlinedIcon />, label: <Typography>Confirm Order</Typography> },
    { icon: <AccountBalanceOutlinedIcon />, label: <Typography>Payment</Typography> }
  ]

  return (
    <>
      <div className="stepContainer">

        <Stepper style={stepStyle} alternativeLabel activeStep={activeState} >
          {steps.map((item, index) => (
            <Step key={index} active={(activeState===index)?true:false} completed={activeState>=index?true:false}>
              <StepLabel  iconContainerStyle={{width: "50px !important"}} icon={item.icon}>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  )
}

export default StepperComponent