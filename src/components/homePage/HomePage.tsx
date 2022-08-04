import React from 'react'
import '../homePage/MainPage.css'
import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import {Root} from './leasingmodel'
import { useHistory } from 'react-router'
import { QuickQuote, QuickQuoteMain } from './leasingmodel';
import { transformQuoteData } from '../../transformer';


export interface IProps{
    setCarData: React.Dispatch<React.SetStateAction<QuickQuote>>
}

function HomePage(prop: IProps) {
    const { setCarData } = prop;
    const authenticate = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRoYUw1R2NYdHFHR3Nma0Z0S1lTeCJ9.eyJuaWNrbmFtZSI6Im5ldWRlc2ljLmluZGlhLmF1dGgwIiwibmFtZSI6Ik5ldWRlc2ljIEluZGlhIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2YzNzVmODMwNjM3MTk2M2NlYTAwNzkwZDdkYzc3YmZhP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbmkucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDEtMTBUMDU6MzQ6NTQuODE3WiIsImVtYWlsIjoibmV1ZGVzaWMuaW5kaWEuYXV0aDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vYXV0aC5lY2xpcHguY29tLyIsInN1YiI6ImF1dGgwfDYxOTFlNTFlMWVmOGY4MDA2OWNhYTQxNyIsImF1ZCI6ImNLYmZ0clZFRTI1MmRzODVzUEU5czhJQVNtTEV0YVdSIiwiaWF0IjoxNjQyMDYyNTI3LCJleHAiOjE2NDIwOTg1MjcsIm5vbmNlIjoiYjNKa0xVdzJTeTAyYVhWbldFVlBabXArYm1wT2RraGZOVkkwVFMxM2NVbzFjMlYxVldsQlZtMDFMZz09In0.h2UAm8hhXblXefYd6G86A-n-wuLBcYq-_nISy241erIpg0VCX75l90lWarmyH7tNkFDNx8AzuyzEOyQJsGyCnO-kOzuS3mSq4l-HIH-AIxEjdvTiPyRqJojl6Hpxo7eJ4GGBlhSjaIjmYlpIJ2niGH_l74GMm0ro6qkSObsXQDluACyxjPGIWdlcwP4RzbV7t2xRrr_KmPQj6x41_n6NIb6RDYA1mSaaMuw-slMagkLUEN4L9RKPPUuS0dcp3w_uggJ4vinEe-GPdP16zXXxvIReHL02pgweAav3nDF0ajyUazO00noVJbDiLMlKfykwsMjDd-xf4kQdbwhixePlMw'
    const history = useHistory()
    const [annualvalue, setAnnualValue] = useState<number>(100000)
    const [carValue, setCarValue] = useState<number>(10000)
    const [driveValue, setDriveValue] = useState<number>(3000)
    const [getValue, setGetValue] = useState<number>(1)
    const [getCondition, setGetCondition] = useState<string>("New")
    const [getVehicle, setGetVehicle] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [emailAddress, setEmailAddress] = useState<string>("")
    const [mobileNumber, setMobileNumber] = useState<string>("")
    const [postcodeAddress, setPostcodeAddress] = useState<string>("2020")
    const [stateValue, setStateValue] = useState<string>("")
    


    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: function (index:any) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };

   



    const calculateData = (e:React.MouseEvent<HTMLButtonElement>) => {
       
        e.preventDefault();
        var payload = {
            "operationName": "quickQuote",
            "variables": {
                "payLoad": {
                    "price": `${carValue}`,
                    "registeredState": `${stateValue}`,
                    "kmsPerYear": `${driveValue}`,
                    "leaseTerm": `${getValue}`,
                    "financeOnly": true,
                    "customer": {
                        "annualSalary": `${annualvalue}`,
                        "registrationPostcode": `${postcodeAddress}`,
                    },
                    "bodyType": `${getVehicle}`
                }
            },
            "query": "query quickQuote($payLoad: JSON!) { quickQuote(payLoad: $payLoad) { leaseTerm kmsPerYear costs { fuel maintenance tyres registration insurance } novated { salarySacrificePayment notSalarySacrificePayment novatedSaving totalTaxSaving taxSaving gstSavingBudget gstSavingVehicle salarySacrificeTakeHomePay notSalarySacrificeTakeHomePay salarySacrificeImpactTakeHome notSalarySacrificeImpactTakeHome } calculation { label information sacrifice noSacrifice negative bold } takeHome { sacrifice noSacrifice } } } "
        }

         fetch("https://gateway.eclipx.com/saigon/prod/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticate}`
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then((data:QuickQuoteMain) => {
                // setCarData(payload['variables']['payLoad']);
                // setCarData2(payload['variables']['payLoad']['customer'])
                // return data as Root[]
                const myData = transformQuoteData(data)
                setCarData(myData)
                // setCarData(data)
                history.push('/cardetails')

            })
        })
        // getUsers().then(data => {
        //     console.log(data)
        // })
        

    }

    return (
        <>
            <div className='carIamge'>
                <div className='aboutCar'>
                    <h1 className='carHeading'>Stop dreaming. Start driving.</h1>
                    <h3 className='description'>Novated leasing could save you thousands on your car. Calculate your savings now.</h3>
                </div>
                <div className='carInfo'>
                    <div className='carsection'>
                        <p className='saving'>Finance Savings</p>
                        <p className='runCost'>Running Costs</p>
                    </div>
                    <div className='rangesSection'>
                        <div className='annualSalary'>
                            <div className='desannual'>
                                <p>Gross Annual Salary<i className="fa fa-info" aria-hidden="true"></i></p>
                                <input value={annualvalue} onChange={(e:any) => setAnnualValue(e.target.value)} type='range' min='0' max='1000000' />
                            </div>
                            <div className='annualamount'>
                                <p>${annualvalue}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='carCost'>
                            <div className='descar'>
                                <p>Estimated Car Cost<i className="fa fa-info" aria-hidden="true"></i></p>
                                <input value={carValue} onChange={(e:any) => setCarValue(e.target.value)} className='carrange' type='range' min='10000' max='250000' />
                            </div>
                            <div className='caramount'>
                                <p>${carValue}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='drivenYearly'>
                            <div className='desdrive'>
                                <p>KM's Driven Years<i className="fa fa-info" aria-hidden="true"></i></p>
                                <input value={driveValue} onChange={(e:any) => setDriveValue(e.target.value)} className='driverange' type='range' min='0' max='100000' />
                            </div>
                            <div className='totaldrive'>
                                <p>{driveValue} km</p>
                            </div>
                        </div>

                        <div className='carcondition'>
                            <div className="left">
                                <label htmlFor="leaseTerm">Lease Terms (Years)</label>
                                <ul className='allvariety'>
                                    <li onClick={(e:any) => setGetValue(e.target.value)} style={{ background: getValue == 1 ? "#d3efd3" : "" }} value="1" className="one"> 1 </li>
                                    <li onClick={(e:any) => setGetValue(e.target.value)} style={{ background: getValue == 2 ? "#d3efd3" : "" }} value="2" className="one"> 2 </li>
                                    <li onClick={(e:any) => setGetValue(e.target.value)} style={{ background: getValue == 3 ? "#d3efd3" : "" }} value="3" className="one"> 3 </li>
                                    <li onClick={(e:any) => setGetValue(e.target.value)} style={{ background: getValue == 4 ? "#d3efd3" : "" }} value="4" className="one"> 4 </li>
                                    <li onClick={(e:any) => setGetValue(e.target.value)} style={{ background: getValue == 5 ? "#d3efd3" : "" }} value="5" className="one"> 5 </li>
                                </ul>
                            </div>
                            <div className="right">
                                <label htmlFor="vehicleType">Vehicle Condition</label>
                                <ul className='vehicle'>
                                    <li className="type" style={{ background: getCondition == "New" ? "#d3efd3" : "" }} onClick={(e:any) => setGetCondition(e.target.innerText)} value="New"> New </li>
                                    <li className="type" style={{ background: getCondition == "Used" ? "#d3efd3" : "" }} onClick={(e:any) => setGetCondition(e.target.innerText)} value="Used"> Used </li>
                                </ul>
                            </div>
                        </div>
                        <div className='vehiclebody'>
                            <p>Vehicle body Type</p>
                            <Slider {...settings}  >
                            
                                <div className='carimage'>
                                    <li value="Small" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "Small" ? "#d3efd3" : "" }} className='smallimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/small.svg" /><p className='sizes'>Small</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="Mid-Size" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "Mid-Size" ? "#d3efd3" : "" }} className='midsizeimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/mid-size.svg" /><p>Mid-Size</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="Large" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "Large" ? "#d3efd3" : "" }} className='largeimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/large.svg" /><p className='sizes'>Large</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="SUV" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "SUV" ? "#d3efd3" : "" }} className='suvimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/suv.svg" /><p className='sizes'>SUV</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="4WD" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "4WD" ? "#d3efd3" : "" }} className='wdimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/4wd.svg" /><p className='sizes'>4WD</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="Luxury" onClick={(e:any) => setGetVehicle(e.target.innerText)} style={{ background: getVehicle == "Luxury" ? "#d3efd3" : "" }} className='luxuryimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/luxury.svg" /><p className='sizes'>Luxury</p></li>
                                </div>
                                <div className='carimage'>
                                    <li value="Sports" onClick={(e:any) => console.log(e.target.innerText)} style={{ background: getVehicle == "Sports" ? "#d3efd3" : "" }} className='sportsimage' ><img src="https://novatedleasing.com.au/assets/images/body-types/sports.svg" /><p className='sizes'>Sports</p></li>
                                </div>
                            </Slider>
                        </div>
                        <div>
                            <p className='details'>Your Details</p>
                            <div className='formdetails'>
                                <input className='formfields' type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <input className='formfields' type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <input className='formfields' type="text" placeholder='Mobile' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                <input className='formfields' type="email" placeholder='Email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                                <div className="dropdown">
                                    <select onChange={(e) => setStateValue(e.target.value)} className='drop'>
                                        <option className="dropdown-item">State</option>
                                        <option value="ACT" className="dropdown-item">ACT</option>
                                        <option value="NSW" className="dropdown-item">NSW</option>
                                        <option value="NT" className="dropdown-item">NT</option>
                                        <option value="QLD" className="dropdown-item">QLD</option>
                                        <option value="SA" className="dropdown-item">SA</option>
                                        <option value="TAS" className="dropdown-item">TAS</option>
                                        <option value="VIC" className="dropdown-item">VIC</option>
                                        <option value="WA" className="dropdown-item">WA</option>
                                    </select>
                                </div>
                                <input className='postfield' type="text" placeholder='Postcode' value={postcodeAddress} onChange={(e) => setPostcodeAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button className='datacalculation' onClick={(e) => calculateData(e)}>Calcultaion</button>
                    <hr className='afterline'></hr>
                    <p className='paradesc'>Important information: This calculator is provided for illustrative purpose only. The figures are estimates and do not constitute a quote or offer. The figures are based on the information you provided and a number of factors and assumptions. To view these factors and assumptions click here. I acknowledge that I have read and agree to the Privacy Disclosure and Consent.</p>
                </div>
            </div>
        </>
    )
}

export default HomePage

