import React, { useState } from 'react'
import { Calculation, QuickQuote } from '../homePage/leasingmodel'
import '../detailsPage/car.css'

export interface IProps {
    carData: QuickQuote
}



function CarDetails(prop: IProps) {
    const { carData } = prop;
    const [leaseTerm, setLeaseTerm] = useState(carData);
    const [active,setActive] = useState<boolean>(true);
    const getNovated = ()=>{
        setActive(true)
    }
    const getCar = ()=>{
        setActive(false)
    }
    const calcutingLease = (value: string) => {
        switch (value) {
            case "y":
                var newCaclculation = carData.calculation.map((item: Calculation) => { return ({ ...item, sacrifice: item.sacrifice * 12, noSacrifice: item.noSacrifice * 12 }) });
                setLeaseTerm({ ...carData, novated: { ...carData.novated, salarySacrificePayment: carData.novated.salarySacrificePayment * 12, notSalarySacrificePayment: carData.novated.notSalarySacrificePayment * 12, taxSaving: carData.novated.taxSaving * 12, totalTaxSaving: carData.novated.totalTaxSaving * 12 }, takeHome: { ...carData.takeHome, sacrifice: carData.takeHome.sacrifice * 12, noSacrifice: carData.takeHome.noSacrifice * 12 }, calculation: newCaclculation });
                break;
            case "m":
                setLeaseTerm({ ...carData });
                break;
            case "f":
                var newCaclculation = carData.calculation.map((item: Calculation) => { return ({ ...item, sacrifice: item.sacrifice * 1/2, noSacrifice: item.noSacrifice * 1/2 }) });
                setLeaseTerm({ ...carData, novated: { ...carData.novated, salarySacrificePayment: carData.novated.salarySacrificePayment * 1/2, notSalarySacrificePayment: carData.novated.notSalarySacrificePayment * 1/2, taxSaving: carData.novated.taxSaving * 1/2, totalTaxSaving: carData.novated.totalTaxSaving * 1/2 }, takeHome: { ...carData.takeHome, sacrifice: carData.takeHome.sacrifice * 1/2, noSacrifice: carData.takeHome.noSacrifice * 1/2 }, calculation: newCaclculation });
                break;
            case "w":
                var newCaclculation = carData.calculation.map((item: Calculation) => { return ({ ...item, sacrifice: item.sacrifice * 1/4, noSacrifice: item.noSacrifice * 1/4 }) });
                setLeaseTerm({ ...carData, novated: { ...carData.novated, salarySacrificePayment: carData.novated.salarySacrificePayment * 1/4, notSalarySacrificePayment: carData.novated.notSalarySacrificePayment * 1/4, taxSaving: carData.novated.taxSaving * 1/4, totalTaxSaving: carData.novated.totalTaxSaving * 1/4 }, takeHome: { ...carData.takeHome, sacrifice: carData.takeHome.sacrifice * 1/4, noSacrifice: carData.takeHome.noSacrifice * 1/4 }, calculation: newCaclculation });
                break;

        }

    }
    return (
        <div className='leaseterm'>
            <div className="leasevalues">
            <p>Your</p>
            <select className='leaseopt' onChange={(e) => calcutingLease(e.target.value)}>
                <option value="m">monthly</option>
                <option value="w">weekly</option>
                <option value="y">yearly</option>
                <option value="f">fortnightly</option>
            </select>
            <p>compare to a car loan</p>
            </div>
            <div className='novatedcar'>
                <div className='novated' onClick={getNovated} style={{ background: active == true ? "#fff" : "#2f767c", color:active==true?"black":"#38a3ab"}}>
                    <img src="https://assets.eclipx.com/novatedleasing/icons/novated-active.svg"/>
                    <p>Novated Lease</p>
                   {carData ? (<p className='novvalue'>${carData && (leaseTerm.novated.salarySacrificePayment).toFixed(2)}</p>):(<img src="{giphy}" />)}
                    <hr style={{ display: active == true ? "" : "none"}}></hr>
                </div>
                <div className='car' onClick={getCar} style={{ background: active == false ? "#fff" : "#2f767c", color:active==false?"black":"#38a3ab" }}>
                <img src="https://assets.eclipx.com/novatedleasing/icons/not-novated-inactive.svg"/>
                    <p>Car Loan</p>
                    <p  className='novvalue'>${carData && (leaseTerm.novated.notSalarySacrificePayment).toFixed(2)}</p>
                    <hr style={{ display: active == false ? "" : "none"}}></hr>
                </div>
            </div>
            {active==true?<div className='estimation'>
                <p>You could save an estimated ${carData && (leaseTerm.novated.taxSaving).toFixed(2)}/ month or</p>
                <p>${carData && (leaseTerm.novated.totalTaxSaving).toFixed(2)}over 4 years with a novated lease</p>
            </div>:<div className='estimation'>No tax or GST savings</div>}

            {
                carData && leaseTerm.calculation.map((item: Calculation) => {
                    return (
                        <div className='calculationvalue'>
                            <p className='calclabel'>{item.label}</p>
                            <p className='calcsacrifice' style={{ background: active == true ? "#fff" : "#2f767c", color:active==true?"black":"#38a3ab"}}>${(item.sacrifice).toFixed(2)}</p>
                            <p className='calcnosacrifice' style={{ background: active == false ? "#fff" : "#2f767c", color:active==false?"black":"#38a3ab"}}>${(item.noSacrifice).toFixed(2)}</p>
                        </div>
                    )
                })
            }
            <div className='estimatehome'>
                <p className='taketitle'>ESTIMATED TAKE HOME PAY</p>
                <p style={{ background: active == true ? "#fff" : "#2f767c", color:active==true?"black":"#38a3ab"}} className='takesacrifice'>${carData && (leaseTerm.takeHome.sacrifice).toFixed(2)}</p>
                <p style={{ background: active == false ? "#fff" : "#2f767c", color:active==false?"black":"#38a3ab"}} className='takenosacrifice'>$ {carData && (leaseTerm.takeHome.noSacrifice).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default CarDetails
