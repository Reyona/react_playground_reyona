import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './index.css';

import { FoodType, ShopType, OrderType } from '@/types/order';
import { getShop, addFood, removeFood } from '@/store/order'
import Header from '@components/eat/Header';
import Footer from '@components/eat/Footer';
import Menu from '@components/eat/Menu';
import Order from '@components/eat/Order';
import Shop from '@components/eat/Shop';
import { useEffect, useState } from 'react';

interface Props {
    order: OrderType;
    getShop(param: any): void;
    addFood(param: FoodType): void;
    removeFood(param: FoodType): void;
}

const App = ({ order, getShop, addFood, removeFood }: Props) => {
    const onNavChange = () => alert('Coming soon!');
    const onClickPay = () => alert('Coming soon!');
    const onClickPhone = () => alert('Coming soon!');
    const [shopId] = useState('shop888');
    useEffect(() => {
        getShop({id: shopId});
    }, [shopId]);

    return (
        <div className='page-container' data-testid='page-container'>
            <Header onChange={onNavChange} />
            {order.shop?.menu ? <Menu menu={order.shop.menu} addFood={addFood} /> : null}
            <Order order={order} removeFood={removeFood} />
            {order.shop ? <Shop shop={order.shop} onClickPhone={onClickPhone} /> : null}
            <Footer order={order} onPay={onClickPay} />
        </div>
    );
};

// 状态映射
const mapStateToProps = (state: any) => ({
    order: state.order.order,
});

// action映射
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ addFood, removeFood, getShop }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);