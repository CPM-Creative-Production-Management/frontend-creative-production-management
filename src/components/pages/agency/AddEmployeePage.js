import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import {Input, Button} from 'semantic-ui-react'
import { base_url } from '../../../index'
import { useApiRequest } from '../../api/useApiRequest'
import { regularApiRequest } from '../../api/regularApiRequest'
import { showToast } from '../../../App'
import { useNavigate } from 'react-router-dom'
import s3 from '../../../config/s3'

const AddEmployeePage = () => {
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const [date, setDate] = useState('')
    const addressRef = useRef('')
    const ratingRef = useRef('')
    const salaryRef = useRef('')
    const phoneRef = useRef('')
    const emailRef = useRef('')
    const imageRef = useRef('')

    let navigate = useNavigate()

    const handleFile = (e) => {
        const file = e.target.files[0]
        
    }

    const addEmp = async () => {
        const firstName = firstNameRef.current.inputRef.current.value
        const lastName = lastNameRef.current.inputRef.current.value
        const address = addressRef.current.inputRef.current.value
        const rating = ratingRef.current.inputRef.current.value
        const salary = salaryRef.current.inputRef.current.value
        const email = emailRef.current.inputRef.current.value
        const phone = phoneRef.current.inputRef.current.value
        const dob = date

        if (!firstName || !lastName || !address || !rating || !salary || !email || !phone || !dob) {
            showToast('Please fill all fields', 'error')
            return
        }

        if (rating < 1 || rating > 5) {
            showToast('Rating must be between 1 and 5', 'error')
            return
        }

        // if rating is not an integer
        if (rating % 1 !== 0) {
            showToast('Rating must be an integer', 'error')
            return
        }

        
        const reqBody = {
            name: firstName + ' ' + lastName,
            address: address,
            rating: rating,
            dob: dob,
            salary: salary,
            email: email,
            phone: phone
        }

        const response = await regularApiRequest({
            url: base_url + 'employee',
            method: 'POST',
            reqBody: reqBody
        })

        const file = imageRef.current.inputRef.current.files[0]

        try {
            const params = {
                Bucket: 'cpm-backend',
                Key: 'profile_pictures/employees/' + response.data.id + '.jpg',
                Body: file
            }
    
            s3.putObject(params, function(err, data) {
                if (err) console.log(err); // an error occurred
            });
        } catch (err) {
            console.log(err)
        }

        if (response.status === 200) {
        showToast('Employee added succesfully', 'success')
        navigate('/my-employees')
        } else {
        showToast('Error adding employee', 'error')
        }
    }

    const dateChange = (event, data) => {
        const date = data.value
        const offset = date.getTimezoneOffset()
        const dateOffset = new Date(date.getTime() - (offset*60*1000))
        setDate(dateOffset.toISOString().split('T')[0])
    }

    const fileUpload = async () => {

        // const params = {
        //     Bucket: 'cpm-backend',
        //     Key: 'test.txt',
        //     Body: 'Hello!'
        // }
        // s3.putObject(params, function(err, data) {
        //     if (err) console.log(err); // an error occurred
        //     else     console.log(data);           // successful response
        //   });

        console.log(imageRef.current.inputRef.current.files[0])
    }

  return (
    <div>
       <center>
        <h1>Add Employee</h1>
        </center>

        <Grid columns={2}>
            <Grid.Column>
            <Input required ref={firstNameRef} type='text' className='mt-4'
                           fluid
                           size='large' placeholder='First Name'/>
            </Grid.Column>
            <Grid.Column>
            <Input required ref={lastNameRef} type='text' className='mt-4'
                           fluid
                           size='large' placeholder='Last Name'/>
            </Grid.Column>
        </Grid>
        <Grid columns={1}>
            <Grid.Column>
            <Input required ref={addressRef} type='text' className='mt-0'
                            fluid
                            size='large' placeholder='Address'/>
            </Grid.Column>
        </Grid>
        <Grid columns={2}>
            <Grid.Column>
            <Input required ref={ratingRef} type='number' max={5} min={1} className='mt-0'
                            fluid
                            size='large' placeholder='Rating'/>
            </Grid.Column>
            <Grid.Column>
            <Input required ref={salaryRef} type='number' className='mt-0'
                            fluid
                            size='large' placeholder='Salary'/>
            </Grid.Column>
        </Grid>
        <Grid columns={2}>
            <Grid.Column>
            <Input required ref={emailRef} type='text' className='mt-0'
                            fluid
                            size='large' placeholder='Email'/>
            </Grid.Column>
            <Grid.Column>
            <Input required ref={phoneRef} type='text' className='mt-0'
                            fluid
                            size='large' placeholder='Phone'/>
            </Grid.Column>
        </Grid>
        <h4>Profile Picture</h4>
        <Grid>
            <Grid.Column>
                <Input type="file" onChange={handleFile} ref={imageRef} />
            </Grid.Column>
        </Grid>
        
        <br></br>
        Date of Birth <br/>
        <SemanticDatepicker className={'mt-2'}  onChange={dateChange} filterDate={(date) => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            return date <= yesterday
            
        }}></SemanticDatepicker>
        <br></br>
        <br></br>
        <Button primary onClick={addEmp}>Add Employee</Button>
    </div>
  )
}

export default AddEmployeePage