import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import Shop from './Shop'

describe(`test Footer`, () => {
    it(`
        should show location and phone icon
        when render Shop
    `, () => {
        const shop = {
            id: 'shop888',
            location: ['Dongcheng District Metro', 'Cultural Building'],
            telephone: '18999999999',
            menu: []
        }
        render(<Shop shop={shop} onClickPhone={() => {}} />)
        const result = screen.getAllByTestId('location').map(element => element.textContent)
        expect(result).toEqual(['Dongcheng District Metro', 'Cultural Building'])
        expect(screen.getByAltText('phone')).toBeInTheDocument()
    })

    it(`
        should call the onClickPhone function
        when click the phone icon
    `, async () => {
        const shop = {
            id: 'shop888',
            location: ['Dongcheng District Metro', 'Cultural Building'],
            telephone: '18999999999',
            menu: []
        }
        const onClickPhone = jest.fn()
        render(<Shop shop={shop} onClickPhone={onClickPhone} />)
        fireEvent.click(screen.getByAltText('phone'))
        expect(onClickPhone).toBeCalled()
    })

})