import React, {  useState } from 'react'
import './shipping.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TransferWithinAStationOutlinedIcon from '@mui/icons-material/TransferWithinAStationOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Country, State } from 'country-state-city'
import { saveShippingInfo } from '../../action/cartActions';
import StepperComponent from './StepperComponent';
import { useAlert } from 'react-alert'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
const Shipping = () => {
  const alert = useAlert()
  const history = useNavigate()
  const { shippingInfo } = useSelector(state => state.Cart)
  let [state, setState] = useState(shippingInfo.state)
  const [address, setAddress] = useState(shippingInfo.address)
  const [country, setCountry] = useState(shippingInfo.country)
  const [city, setCity] = useState(shippingInfo.city)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
  const dispatch = useDispatch()
  const {user}=useSelector(state=>state.User)
  const shippingSubmit = (e) => {
    e.preventDefault()
    if (phoneNo.length < 10) {
      return alert.error("Phone No. shoule be 10 digit long")
    }
    dispatch(saveShippingInfo({ address, state, city, country, phoneNo, pinCode,name:user.name }))
    history('/order/confirm')
  }
  return (
    <>
      <div className="shippingContainer">
        <StepperComponent activeState="0" />
        <div className="shippingDetailsContainer">
          <div className="formContainer">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form onSubmit={shippingSubmit} encType='multipart/form-data' className='shippingForm'>
              <div className='form'>
                <div>
                  <div>
                    <HomeOutlinedIcon />
                    <input autoComplete={false} type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div>
                    <LocationCityOutlinedIcon />
                    <input autoComplete="false" type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div>
                    <PhoneOutlinedIcon />
                    <input autoComplete="false" type="number" placeholder='Phone Number' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                  </div>

                </div>
                <div>
                  <div>
                    <PinDropOutlinedIcon />
                    <input autoComplete="false" type="number" placeholder='Pin Code' required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                  </div>
                  <div>
                    <PublicOutlinedIcon />
                    <select required value={country} onChange={(e) => setCountry(e.target.value)} >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => {
                          return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                        })
                      }
                    </select>
                  </div>
                  {country &&
                    <div>
                      <TransferWithinAStationOutlinedIcon />
                      <select required value={state} onChange={(e) => setState(e.target.value)} >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => {
                            return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                          })
                        }
                      </select>
                    </div>
                  }

                </div>
              </div>
              <button className='submitBtn' autoComplete="false" type="submit" disabled={(!state || !country) ? true : false}>
                Continue <KeyboardArrowRightOutlinedIcon /><KeyboardArrowRightOutlinedIcon />
              </button>
            </form>
          </div>
        </div>



      </div>

    </>

  )
}

export default Shipping