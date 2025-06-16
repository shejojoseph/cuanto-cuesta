// The environment setup and configuration, and also the testing structure is suggested by AI tool
import App from '../App';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'


// mock the components
vi.mock('../items', () => ({ //replace the real Items/Search component with a dummy one
  default: ({ itemsOO }: { itemsOO: any }) => (
    <div data-testid="mock-item">{itemsOO.item_name}</div>
  ),
}))

vi.mock('../search', () => ({
  default: () => <div data-testid="mock-search" />,
}))

describe('App Component', () => {
  const ENDPOINT = 'http://192.168.31.133:3000/itemTags'

  beforeEach(() => { // restore all mocks before each test, beforeEach runs before each "it" to reset spies and mocks
    vi.restoreAllMocks()
  })

  it('when initialized, calls the fetch', async () => {
    // The mock fetch returning empty array
    const fetchMock = vi
      .spyOn(global, 'fetch') // Spy on global.fetch and mock its returned value
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [], // This mock makes fetch resolve to ok: true and json() => [].
      } as any)

    render(<App />) // Render the App component

    // wait for the text to displayed
    expect(
      await screen.findByText(/Escriba el producto que está buscando/) //input the product you want to search
    ).toBeInTheDocument()

    // proofing that fetch is correctly called, the body the initailized empty array
    expect(fetchMock).toHaveBeenCalledWith(ENDPOINT, { // Assert that fetch was called with correct arguments
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
  })


  it('renders corresponding items after fetching', async () => {
    const mockItems = [ // Prepare mock items data
      {
        item_name: 'Cloro',
        item_name_toLowerCase: 'cloro',
        item_id: 1,
        price: 5.0,
        SupermercadoId: 1,
      },
      {
        item_name: 'Ajax',
        item_name_toLowerCase: 'ajax',
        item_id: 2,
        price: 3.5,
        SupermercadoId: 2,
      },
    ]

    // Mock fetch to return mockItems
    vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems,
      } as any)

    render(<App />)

    // Wait for the list to render and assert
    await waitFor(() => {
      const items = screen.getAllByTestId('mock-item')
      expect(items).toHaveLength(2)

      expect(items[0]).toHaveTextContent('Cloro')
      expect(items[1]).toHaveTextContent('Ajax')
    })
  })
})