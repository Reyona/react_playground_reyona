import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import Footer from './Footer'

describe(`test Footer`, () => {
    it(`
        should show pay button and price
        when render Footer
    `, () => {
        const order = {
            totalPrice: 0
        }
        render(<Footer order={order} onPay={() => {}} />)
        expect(screen.getByText(/pay/i)).toBeInTheDocument()
        const spanElements = screen.getAllByRole('generic').filter(element => element.tagName === 'SPAN')
        expect(spanElements[0].textContent).toEqual('0')
        expect(spanElements[1].textContent).toEqual('$')
    })

    it(`
        should change the price
        when the totalPrice of order change
    `, async () => {
        const order = {
            totalPrice: 0
        }
        render(<Footer order={order} onPay={() => {}} />)
        await act(async () => {
            order.totalPrice = 1000
            await new Promise(resolve => setTimeout(resolve, 500));
        })
        const spanElements = screen.getAllByRole('generic').filter(element => element.tagName === 'SPAN')
        expect(spanElements[0].textContent).toEqual('10')
    })

    it(`
        should call onPay function
        when click the pay button and the price is not 0
    `, async () => {
        const order = {
            totalPrice: 1000
        }
        const onClickPay = jest.fn()
        render(<Footer order={order} onPay={onClickPay} />)
        fireEvent.click(screen.getByText(/pay/i))
        expect(onClickPay).toBeCalled()
    })

    it(`
        should not call onPay function
        when click the pay button and the price is 0
    `, async () => {
        const order = {
            totalPrice: 0
        }
        const onClickPay = jest.fn()
        render(<Footer order={order} onPay={onClickPay} />)
        fireEvent.click(screen.getByText(/pay/i))
        expect(onClickPay).not.toBeCalled()
    })
})