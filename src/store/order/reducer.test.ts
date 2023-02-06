import { Order } from '../actions';
import orderReducer from './index';
import { initialState, StateType } from './index';
import { FoodType } from '@/types/order';

describe(`test reducers`, () => {
    it(`
        should add the food into order according to the food type
        when action "Order.ADD_FOOD" is dispatched with new food
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

        const expected = {
            ...initialState,
            order: {
                ...initialState.order,
                snack: food,
            }
        }

        const result = orderReducer(initialState, { type: Order.ADD_FOOD, payload: food })
        expect(result).toEqual(expected)
    })

    it(`
        should remove the food from order according to the food type
        when action "Order.REMOVE_FOOD" is dispatched
    `, () => {
        const state: StateType = {
            ...initialState,
            order: {
                ...initialState.order,
                snack: {
                    id: 'snack001',
                    type: 'snack',
                    price: 400,
                    name: 'FRIES',
                    banner: require('@resources/fries_1.svg').default,
                    bannerAnimation: '',
                    bannerStars: 1,
                    preview: require('@resources/fries.svg').default,
                },
            }
        }

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

        const expected = {
            ...initialState,
            order: {
                ...initialState.order,
                snack: undefined,
            }
        }

        const result = orderReducer(state, { type: Order.REMOVE_FOOD, payload: food })
        expect(result).toEqual(expected)
    })

    it(`
        should re-calculate the total price according to the foods in order
        when action "Order.CALC_TOTAL_PRICE" is dispatched
    `, () => {
        const state: StateType = {
            ...initialState,
            order: {
                ...initialState.order,
                totalPrice: 1300,
            }
        }

        const expected = {
            ...initialState,
            order: {
                ...initialState.order,
                totalPrice: 0,
            }
        }

        const result = orderReducer(state, { type: Order.CALC_TOTAL_PRICE })
        expect(result).toEqual(expected)
    })
})