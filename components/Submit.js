import React, { useState, useRef } from 'react'


const Submit = () => {
    const [customer, setCustomer] = useState({
        name: "", vehiclename: "", vehiclenumber: "", phonenumber: ""
    })
    const ref = useRef()
    let name, value;
    const handleInputs = (e) => {
        name = e.target.id
        value = e.target.value
        setCustomer({ ...customer, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, vehiclename, vehiclenumber, phonenumber } = customer

        const res = await fetch("/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                name, vehiclename, vehiclenumber, phonenumber
            })
        })

        const data = await res.json()

        // const token = data.authToken
    
        const token = data.authToken 
        localStorage.setItem('token',token)

        console.log(data);
        if (data.errors || data.error) {
            window.alert("Please fill the correct detail")
        }
        else {
            window.alert("Customer created successfully")
            // localStorage.setItem('token', token)
            
        }
       
        
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <form>
                <div className="mx-5 my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={customer.name} onChange={handleInputs} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
                </div>

                <div className="mx-5">
                    <label htmlFor="vehiclename" className="form-label">Vehicle Name</label>
                    <input value={customer.vehiclename} onChange={handleInputs} type="text" className="form-control" id="vehiclename" />
                </div>

                <div className="mx-5">
                    <label htmlFor="vehiclenumber" className="form-label">Vehicle Number</label>
                    <input value={customer.vehiclenumber} onChange={handleInputs} type="number" className="form-control" id="vehiclenumber" />
                </div>

                <div className="mx-5">
                    <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                    <input value={customer.phonenumber} onChange={handleInputs} type="number" className="form-control" id="phonenumber" />
                </div>

                <button type="submit" onClick={handleSubmit} className="mx-5 my-3 btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}

export default Submit