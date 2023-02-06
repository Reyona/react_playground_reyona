import { createStore } from 'redux'
import { addFood, removeFood } from './index';
import orderReducer from './index';
import { initialState } from './index';
import { FoodType } from '@/types/order';

describe(`test actions`, () => {
    it(`
        should add the food into order and re-calculate the total price
        when call the bindAction "addFood" with new food
    `, () => {
        const store = createStore(orderReducer, initialState);
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
                totalPrice: 400
            }
        }

        addFood(food)(store.dispatch)
        const result = store.getState()
        expect(result).toEqual(expected);
    })

    it(`
        should remove the food from order and re-calculate the total price
        when call the bindAction "removeFood" with new food
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
        const main: FoodType = {
            id: 'main001',
            type: 'main',
            price: 600,
            name: 'BURGER',
            banner: require('@resources/burger_1.svg').default,
            bannerAnimation: '',
            bannerStars: 3,
            preview: require('@resources/burger.svg').default,
        }
        const store = createStore(orderReducer, {
            ...initialState,
            order: {
                ...initialState.order,
                snack: snack,
                main: main,
                totalPrice: 1000
            }
        });

        const expected = {
            ...initialState,
            order: {
                ...initialState.order,
                snack: undefined,
                main: main,
                totalPrice: 600
            }
        }

        removeFood(snack)(store.dispatch)
        const result = store.getState()
        expect(result).toEqual(expected);
    })
})