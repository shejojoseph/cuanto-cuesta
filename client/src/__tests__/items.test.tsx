import { describe, it, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import React from 'react'
import { render, screen } from '@testing-library/react'

import Items from '../items'
import logoAutomercadoElPlazas from "../../img/logo-automercado-el-plazas.png"
import logoExcelsiorGama   from "../../img/logo-excelsior-gama-nuevo.png"
import logoCentralMadeirense from "../../img/logo-central-madeirense.png"

describe('Items component', () => {
  it('Renders logoAutomercadoElPlazas when SupermercadoId === 1', () => {
    const item = { SupermercadoId: 1, item_name: 'cloro', price: 180 } // mock data
    render(<Items itemsOO={item} />) // render is to display <Items />.
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', logoAutomercadoElPlazas)
  })

  it('Renders logoExcelsiorGama when SupermercadoId === 2', () => {
    const item = { SupermercadoId: 2, item_name: 'manzana', price: 35 }
    render(<Items itemsOO={item} />) // render is to display <Items />.
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', logoExcelsiorGama)
  })

  it('Renders logoCentralMadeirense when SupermercadoId other than 1 or 2', () => {
    const item = { SupermercadoId: 10, item_name: 'fresa', price: 20 }
    render(<Items itemsOO={item} />) // render is to display <Items />.
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', logoCentralMadeirense)
  })

  it('displays correct names and prices of products', () => {
    const item = { SupermercadoId: 1, item_name: 'testGood', price: 123 }
    render(<Items itemsOO={item} />)
    expect(screen.getByText('testGood')).toBeInTheDocument()
    expect(screen.getByText('Bs. 123')).toBeInTheDocument()
  })
})