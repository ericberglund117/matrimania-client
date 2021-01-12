import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

import VendorDashboard from '../components/VendorDashboard/VendorDashboard';

describe('VendorDashboard', () => {
	it('should render the vendor dashboard', () => {
		render(
			<MemoryRouter>
				<VendorDashboard />
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
		expect(screen.getByText('All')).toBeInTheDocument();
	});

	it('should allow the user to select a filter by option', () => {
		render(
			<MemoryRouter>
				<VendorDashboard />
			</MemoryRouter>
		)
		const addWeddingButton = screen.getByRole('link', { name: /add a wedding/i })
		expect(addWeddingButton).toBeInTheDocument();
		expect(screen.getByText('Filter By :')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();

		const filterAll = screen.getByText('All');
		const filterUpcoming = screen.getByText('Upcoming')
		const filterPast = screen.getByText('Past')
		const filterToday = screen.getByText('Today')
		
		userEvent.click(filterAll)
		expect(filterAll).toBeInTheDocument();

		userEvent.click(filterUpcoming)
		expect(filterUpcoming).toBeInTheDocument();

		userEvent.click(filterPast)
		expect(filterPast).toBeInTheDocument();

		userEvent.click(filterToday)
		expect(filterToday).toBeInTheDocument();
	});

})