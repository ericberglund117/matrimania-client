import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/App/App';
import { getWeddings, postAWedding, getSingleWeddingPhotos, getSingleWeddingGuests, deleteWedding, postAGuest, postAPhoto } from '../apiCalls';

jest.mock('../apiCalls.tsx');

describe('App', () => {
  beforeEach(() => {
    getWeddings.mockResolvedValue([
      {
        "id": 31,
        "name": "Bueller",
        "email": "saveferris@netscape.com",
        "date": "01/28/2021",
        "image": "https://imagelink.com"
      }
    ])
    getSingleWeddingPhotos.mockResolvedValue([])
    getSingleWeddingGuests.mockResolvedValue([])
  })

  it('renders all App elements', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    const appLogo = screen.getByAltText("Matrimania Logo");
    const addWeddingLink = screen.getByText("Add A Wedding");
    const filterLink = screen.getByText("Filter By :");
    expect(appLogo).toBeInTheDocument();
    expect(addWeddingLink).toBeInTheDocument();
    expect(filterLink).toBeInTheDocument();

    await waitFor(() => {})

    const weddingName2 = screen.getByText("Bueller Wedding");
    const weddingDate2 = screen.getByText("01/28/2021");
    const weddingImage2 = screen.getByAltText("The happy Bueller couple");

    expect(weddingName2).toBeInTheDocument();
    expect(weddingDate2).toBeInTheDocument();
    expect(weddingImage2).toBeInTheDocument();
  });

  it('can add a wedding', async () => {

    postAWedding.mockResolvedValue({
      "id": 33,
      "name": "Banks",
      "email": "philNviv@belair.com",
      "date": "02/22/2022",
      "image": "https://image2.org"
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    const addWeddingLink = screen.getByText("Add A Wedding");
    userEvent.click(addWeddingLink);

    const nameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const dateInput = screen.getByPlaceholderText("Wedding Date");
    const imageInput = screen.getByPlaceholderText("Image Link (optional)");
    const submitButton = screen.getByText("Submit Wedding");
    
    userEvent.type(nameInput, 'Banks')
    userEvent.type(emailInput, 'philNviv@belair.com')
    userEvent.type(dateInput, '2022-02-22')
    userEvent.type(imageInput, 'www.image.com/image.jpg')
    userEvent.click(submitButton)

    await waitFor(() => {})
    const weddingName1 = screen.getByText("Banks Wedding");
    const weddingDate1 = screen.getByText("02/22/2022");
    const weddingImage1 = screen.getByAltText("The happy Banks couple");
    expect(weddingName1).toBeInTheDocument();
    expect(weddingDate1).toBeInTheDocument();
    expect(weddingImage1).toBeInTheDocument();
  });

  it('can route a user to a wedding details page', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    await waitFor(() => {})
    const wedding2Link = screen.getByTestId("Bueller-link")
    expect(wedding2Link).toBeInTheDocument();
    userEvent.click(wedding2Link);

    await waitFor(() => {})
    const weddingName = screen.getByText("Bueller Wedding");
    const weddingDate = screen.getByText("01/28/2021");
    const weddingEmail = screen.getByText("Email: saveferris@netscape.com");
    const status = screen.getByText("Status: Pending");
    const deleteButton = screen.getByText("Delete Wedding");
    const requestPhotoListButton = screen.getByText("Request Photo List");
    const addPhotoListButton = screen.getByText("Add Photo List");

    expect(weddingName).toBeInTheDocument();
    expect(weddingDate).toBeInTheDocument();
    expect(weddingEmail).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(requestPhotoListButton).toBeInTheDocument();
    expect(addPhotoListButton).toBeInTheDocument();
  });

  it('can delete a wedding', async () => {
    deleteWedding.mockResolvedValue({
      "id": 64, 
      "name": "Bibb", 
      "email": "lettuce@eat.com", 
      "date": "03/23/2435", 
      "image": "www.img.com/weddingpic.jpg"
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 
    await waitFor(() => {});
    const wedding2Link = screen.getByTestId("Bueller-link");
    expect(wedding2Link).toBeInTheDocument();
    userEvent.click(wedding2Link);

    await waitFor(() => {});
    const deleteButton = screen.getByText("Delete Wedding");
    userEvent.click(deleteButton);

    await waitFor(() => {});
    const noWeddingsImage = screen.getByAltText("No weddings in storage");
    expect(noWeddingsImage).toBeInTheDocument();
  });

  it('can display an updated photo list for a wedding after guests and photos are added', async () => {

    postAGuest.mockResolvedValue(
      {
          "id": 36,
          "name": "Otto",
          "phoneNumber": "1234567890",
          "wedding": 31
      }
    );

    postAPhoto.mockResolvedValue({
      "id": 111,
      "number": 1,
      "description": "photo of Otto",
      "guest": [ 36 ],
      "weddingId": 31
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ); 

    await waitFor(() => {})
    const wedding2Link = screen.getByTestId("Bueller-link")
    userEvent.click(wedding2Link);

    await waitFor(() => {});
    const addPhotoListButton = screen.getByText("Add Photo List");
    userEvent.click(addPhotoListButton);

    const guestListEmptyImage = screen.getByAltText("your guest list is empty");
    const guestNameInput = screen.getByPlaceholderText("Guest Name");
    const guestPhoneInput = screen.getByPlaceholderText("Phone (XXX-XXX-XXXX)");
    const submitButton = screen.getByText("Add To Guest List");

    expect(guestListEmptyImage).toBeInTheDocument();
    userEvent.type(guestNameInput, "Otto");
    userEvent.type(guestPhoneInput, "123-456-7890");
    userEvent.click(submitButton);
    getSingleWeddingGuests.mockResolvedValue([
      {
        "id": 36,
        "name": "Otto",
        "phoneNumber": "1234567890",
        "wedding": 31
      }
    ])

    await waitFor(() => {});
    const guest1Name = screen.getByText("Otto");
    const guest1Phone = screen.getByText("1234567890");
    const guest1Delete = screen.getByText("X");

    expect(guestListEmptyImage).not.toBeInTheDocument();
    expect(guest1Name).toBeInTheDocument();
    expect(guest1Phone).toBeInTheDocument();
    expect(guest1Delete).toBeInTheDocument();
    
    const photoListButton = screen.getByTestId("photo-list-button");
    userEvent.click(photoListButton);

    const photoListEmptyImage = screen.getByAltText("your photo list is empty");
    const guest1Checkbox = screen.getByTestId("Otto-checkbox");
    const descriptionInput = screen.getByPlaceholderText("Description (optional)");
    const submitPhotoButton = screen.getByText("Submit Photo");

    expect(photoListEmptyImage).toBeInTheDocument();
    userEvent.type(descriptionInput, "photo of Otto");
    userEvent.click(guest1Checkbox);
    expect(guest1Checkbox).toBeChecked();
    userEvent.click(submitPhotoButton);
    
    getSingleWeddingPhotos.mockResolvedValue([
      {
        "id": 111,
        "number": 1,
        "description": "photo of Otto",
        "guest": [ 36 ],
        "weddingId": 31
      }
    ])

    const photoDescription = await waitFor(() => screen.getByText("Description: photo of Otto"));  
    const photoNumber = screen.getByText("PHOTO 1");
    const photoGuests = screen.getByText("• Otto •");
    expect(photoDescription).toBeInTheDocument();
    expect(photoNumber).toBeInTheDocument();
    expect(photoGuests).toBeInTheDocument();
    
    const doneButton = screen.getByTestId("done-button")
    userEvent.click(doneButton);
    
    const weddingName = screen.getByText("Bueller Wedding");
    const weddingStatus = screen.getByText("Status: Received");
    expect(weddingName).toBeInTheDocument();
    expect(weddingStatus).toBeInTheDocument();
  });
});