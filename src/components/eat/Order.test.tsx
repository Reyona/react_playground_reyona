import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { OrderType, FoodType } from '@/types/order'
import Order from './Order'

describe(`test Order`, () => {
    it(`
        should render order according to the foods
        when set order data
    `, () => {
        const snack: FoodType = {
            id: 'snack001',
            type: 'snack',
            price: 400,
            name: 'FRIES',
            banner: require('@resources/fries_1.svg').default,
            bannerAnimation: '',
            bannerStars: 1,
            preview: require('@resources/fries.svg').default,
        }
        const order:OrderType = {
            drink: undefined,
            main: undefined,
            snack: snack,
            totalPrice: 0,
            shop: undefined,
            customer: undefined,
        }
        render(<Order order={order} removeFood={() => {}} />)
        expect(screen.getByAltText('plate')).toBeVisible()
        expect(screen.getAllByTestId('hit-area').length).toEqual(1)
        expect(screen.getByAltText('FRIES')).toBeInTheDocument()
    })

    it(`
        should call the removeFood function
        when click the orderItem
    `, () => {
        const snack: FoodType = {
            id: 'snack001',
            type: 'snack',
            price: 400,
            name: 'FRIES',
            banner: require('@resources/fries_1.svg').default,
            bannerAnimation: '',
            bannerStars: 1,
            preview: require('@resources/fries.svg').default,
        }
        const order:OrderType = {
            drink: undefined,
            main: undefined,
            snack: snack,
            totalPrice: 0,
            shop: undefined,
            customer: undefined,
        }
        const onClickRemoveFood = jest.fn()
        render(<Order order={order} removeFood={onClickRemoveFood} />)
        fireEvent.click(screen.getByTestId('hit-area'))
        expect(onClickRemoveFood).toBeCalled()
    })
})