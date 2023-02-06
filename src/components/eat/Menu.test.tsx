import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FoodType } from '@/types/order'
import Menu from './Menu'

describe(`test Menu`, () => {
    it(`
        should render menu
        when set a food list
    `, () => {
        const food: Array<FoodType> = [
            {
                id: 'snack001',
                type: 'snack',
                price: 400,
                name: 'FRIES',
                banner: require('@resources/fries_1.svg').default,
                bannerAnimation: '',
                bannerStars: 1,
                preview: require('@resources/fries.svg').default,
            }
        ]
        render(<Menu menu={food} addFood={f => f} />)
        const result = screen.getAllByTestId('menu-item')
        expect(result.length).toEqual(1)
    })

    it(`
        should call addFood function with selected food
        when click add button
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
        const onAddFood = jest.fn()
        render(<Menu menu={[food]} addFood={onAddFood} />)
        fireEvent.click(screen.getByAltText('add'))
        expect(onAddFood).toBeCalled()
        expect(onAddFood).toBeCalledWith(food)
    })
})