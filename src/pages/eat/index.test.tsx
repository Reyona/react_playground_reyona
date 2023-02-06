import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { initialState } from '@/store/order'
import { FoodType } from '@/types/order'
import orderReducer from '@/store/order'
import EatPage from './index'

describe(`test EatPage`, () => {
    it(`
        should render EatPage
        when set a food list
    `, () => {
        // const store = createStore(orderReducer, initialState);
        // render(<Provider store={store}><EatPage /></Provider>)
        // const result = screen.getAllByTestId('page-container')
        // expect(result).toBeInTheDocument()
    })
})