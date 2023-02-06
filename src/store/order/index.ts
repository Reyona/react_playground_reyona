import { Dispatch } from 'redux';
import { Order } from '../actions';
import { FoodType, CustomerType, ShopType, OrderType } from '@/types/order';
import { QueryShopRequest, queryShopInfo, QueryShopResponse } from '@/api/shop';
import { useEffect, useState } from 'react';


export type StateType = Readonly<{ order: OrderType }>;
type ActionType = { type: string; payload?: any };

// 初始状态
const initialCustomer: CustomerType = {
    id: 'customer888',
    location: 'Nanshan Disctric, Shenzhen',
    telephone: '18988888888',
}
const initialShop: ShopType = {
    id: 'shop888',
    location: ['Dongcheng District Metro', 'Cultural Building'],
    telephone: '18999999999',
    menu: [
        {
            id: 'snack001',
            type: 'snack',
            price: 400,
            name: 'FRIES',
            banner: require('@resources/fries_1.svg').default,
            bannerAnimation: '',
            bannerStars: 1,
            preview: require('@resources/fries.svg').default,
        },
        {
            id: 'drink001',
            type: 'drink',
            price: 300,
            name: 'LATTE',
            banner: require('@resources/latte_1.svg').default,
            bannerAnimation: '',
            bannerStars: 2,
            preview: require('@resources/latte.svg').default,
        },
        {
            id: 'main001',
            type: 'main',
            price: 600,
            name: 'BURGER',
            banner: require('@resources/burger_1.svg').default,
            bannerAnimation: '',
            bannerStars: 3,
            preview: require('@resources/burger.svg').default,
        },
    ],
}
export const initialState: StateType = {
    order: {
        drink: undefined,
        main: undefined,
        snack: undefined,
        totalPrice: 0,
        shop: undefined,
        customer: initialCustomer,
    }
};

function calculatePrice(order: OrderType) {
    let totalPrice = 0;
    const keys = Object.keys(order);
    for (let key of keys) {
        if (['main', 'drink', 'snack'].includes(key)) {
            totalPrice += order[key]?.price || 0;
        }
    }
    return totalPrice;
}

export function getShop(param: QueryShopRequest) {
    return async (dispatch: Dispatch) => {
        const data = await queryShopInfo(param);
        dispatch({ type: Order.SET_SHOP, payload: data });
    };
}

export function addFood(food: FoodType) {
    return (dispatch: Dispatch) => {
        dispatch({ type: Order.ADD_FOOD, payload: food });
        dispatch({ type: Order.CALC_TOTAL_PRICE });
    };
}

export function removeFood(food: FoodType) {
    return (dispatch: Dispatch) => {
        dispatch({ type: Order.REMOVE_FOOD, payload: food });
        dispatch({ type: Order.CALC_TOTAL_PRICE });
    };
}

function handlePics(foodList:any) {
    const result = foodList.map((food:any) => ({
        ...food,
        banner: require(`@resources/${food.banner}`),
        preview: require(`@resources/${food.preview}`),
    }));
    return result;
}

export default function (state = initialState, action: ActionType) {
    switch (action.type) {
        case Order.SET_SHOP:
            if (action.payload) {
                return {
                    ...state,
                    order: {
                        ...state.order,
                        shop: {
                            ...action.payload,
                            menu: handlePics(action.payload.menu)
                        },
                    }
                };
            }
            else return state;
        case Order.ADD_FOOD:
            if (action.payload?.type) return {
                ...state,
                order: {
                    ...state.order,
                    [action.payload.type]: action.payload,
                }
            };
            else return state;
        case Order.REMOVE_FOOD:
            if (action.payload?.type) return {
                ...state,
                order: {
                    ...state.order,
                    [action.payload.type]: undefined,
                }
            }
            else return state;
        case Order.CALC_TOTAL_PRICE:
            return {
                ...state,
                order: {
                    ...state.order,
                    totalPrice: calculatePrice(state.order),
                }
            }
        default:
            return state;
    }
}
