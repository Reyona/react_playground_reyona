import { useEffect, useState } from 'react';
import './Footer.css';

import { OrderType } from '@/types/order';

interface Props {
    onPay(): void;
    order: OrderType;
}

const Footer = (props: Props) => {
    const [isHandling, setIsHandling] = useState(false);
    const [price, setPrice] = useState(props.order.totalPrice);

    const onClickPay = () => {
        if (props.order.totalPrice === 0) return;
        props.onPay();
    };

    useEffect(() => {
        setIsHandling(true);
        setTimeout(() => {
            setPrice(props.order.totalPrice);
            setIsHandling(false);
        }, 100);
    }, [props.order.totalPrice]) // delay change for animation

    return (
        <div className='footer'>
            <div className='price'>
                <span className={`number ${isHandling ? 'fade-out' : 'fade-in'}`}
                    style={{ opacity: isHandling ? '0' : '1' }}>{price / 100}</span>
                <span className='unit'>$</span>
            </div>
            <div className='pay' onClick={onClickPay}>Pay</div>
        </div>
    )
}

export default Footer;