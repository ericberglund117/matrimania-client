export const getWeddings = () => {
  return fetch('http://localhost:8000/api/v1/weddings/weddings/')
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return "No weddings found"
  })
}
// name: string, email: string, date: string, image: string
export const postAWedding = (wedding: any) => {
  return fetch('http://localhost:8000/api/v1/weddings/create/', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wedding)
  })
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw Error
    }
  })
  .catch(error => {
    alert('Could not add wedding')
  })
}
// number: number, description: string, guest:number[], weddingId:number
export const postAPhoto = (photo:any) => {
  return fetch(`http://localhost:8000/api/v1/weddings/photos/?weddingId=${photo.weddingId}`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photo)
  })
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw Error
    }
  })
  .catch(error => {
    alert('Could not add photo')
  })
}
// name: string, phoneNumber: string, wedding: number
export const postAGuest = (guest:any) => {
  return fetch(`http://localhost:8000/api/v1/weddings/guests/?wedding=${guest.weddingId}`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest)
  })
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw Error
    }
  })
  .catch(error => {
    alert('Could not add guest')
  })
}

export const getSingleWeddingGuests = (weddingId:number) => {
  return fetch(`http://localhost:8000/api/v1/weddings/guests/?wedding=${weddingId}`)
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return "No guests found"
  })
}

export const getSingleWeddingPhotos = (weddingId:number) => {
  return fetch(`http://localhost:8000/api/v1/weddings/photos/?wedding=${weddingId}`)
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return "No photos found"
  })
}
