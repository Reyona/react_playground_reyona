import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { FoodType } from '@/types/order'
import OrderItem from './OrderItem'

describe(`test OrderItem`, () => {
    it(`
        should render food
        when set a food info
    `, () => {
        const food: FoodType = {
            id: 'snack001',
            type: 'snack',
            price: 400,
            name: 'FRIES',
            banner: require('@resources/fries_1.svg').default,
            bannerAnimation: '',
            bannerStars: 1,
            preview: require('@resources/fries.svg').default,
        }
        render(<OrderItem food={food} removeFood={f => f} />)
        expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it(`
        should call the removeFood function
        when click the item
    `, () => {
        const food: FoodType = {
            id: 'snack001',
            type: 'snack',
            price: 400,
            name: 'FRIES',
            banner: require('@resources/fries_1.svg').default,
            bannerAnimation: '',
            bannerStars: 1,
            preview: require('@resources/fries.svg').default,
        }
        const onClickRemoveFood = jest.fn()
        render(<OrderItem food={food} removeFood={onClickRemoveFood} />)
        userEvent.click(screen.getByTestId('hit-area'))
        expect(onClickRemoveFood).toBeCalled()
    })
})