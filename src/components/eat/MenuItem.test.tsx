import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FoodType } from '@/types/order'
import MenuItem from './MenuItem'

describe(`test MenuItem`, () => {
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
        render(<MenuItem food={food} />)
        expect(screen.getByAltText('FRIES')).toBeInTheDocument()
    })
})