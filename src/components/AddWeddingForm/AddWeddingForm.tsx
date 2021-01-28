import React, { useState } from 'react';
import './AddWeddingForm.css'
import { postAWedding } from '../../apiCalls'
import { StyledButton } from '../App/styledComponents.styles'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'


type NewWedding = {
  id?: number,
  name: string,
  email: string,
  date: string,
  image: string
}
type Props = {
  addNewWedding: any,
}

const AddWeddingForm: React.FC<Props> = ({
  addNewWedding
}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')

  const submitWedding = async (event: React.FormEvent) => {
    //event.preventDefault();
    const weddingDate = dayjs(date).format('MM/DD/YYYY')
    const newWedding: NewWedding = {
      name,
      email,
      date: weddingDate,
      image
    }
    const response = await postAWedding(newWedding);
    addNewWedding(response);
    // should be a POST request + adding card to UI
    clearInputs();
  }

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    const capitalized = s.charAt(0).toUpperCase() + s.slice(1)
    setName(capitalized)
    }

  const clearInputs = () => {
    setName('')
    setEmail('')
    setDate('')
    setImage('')
  }

	return (
    <>
      <form autoComplete="off" className="weddingFormWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle" id="weddingFormTitle">Enter The Wedding Details</h1>
        </article>
        <label htmlFor="lastName"></label>
          <input
            id="weddingFormInput"
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={name}
            onChange={event => capitalize(event.target.value)}
          />
        <label htmlFor="emailAddress"></label>
        <input
          id="weddingFormInput"
          type='text'
          placeholder='Email Address'
          name='emailAddress'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="weddingDate"></label>
        <input
          id="weddingFormInput"
          type='date'
          placeholder='Wedding Date'
          name='weddingDate'
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <label htmlFor="image"></label>
        <input
          id="weddingFormInput"
          type='text'
          placeholder='Image Link'
          name='image'
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        <Link to={`/`}>
          <StyledButton onClick={event => submitWedding(event)}>
            <div id="translate"></div>
              <h2 className="link" id="addListButton">Submit Wedding</h2>
          </StyledButton>
        </Link>
      </form>
    </>
	)
}

export default AddWeddingForm;
