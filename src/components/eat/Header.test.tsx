import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { headerItems } from './Header'

describe(`test Header`, () => {
    it(`
        should display 4 images
        when render Header
    `, () => {
        render(<Header onChange={f => f} />)
        const result = screen.getAllByRole('img')
        expect(result.length).toEqual(4)
    })

    it(`
        should call onClick function
        when click not actived image
    `, () => {
        const onClick = jest.fn()
        const expected = {
            ...headerItems[1],
            actived: false
        }
        render(<Header onChange={onClick} />)
        const images = screen.getAllByRole('img')
        fireEvent.click(images[1])
        expect(onClick).toBeCalledWith(expected, 1)
    })

    it(`
        should not call onClick function
        when click the actived image
    `, () => {
        const onClick = jest.fn()
        render(<Header onChange={onClick} />)
        const images = screen.getAllByRole('img')
        fireEvent.click(images[0])
        expect(onClick).not.toBeCalled()
    })
})