import './Shop.css';

import { ShopType } from '@/types/order';
import locationIcon from '@resources/location.svg';
import phoneIcon from '@resources/phone.svg';

interface Props {
    shop: ShopType;
    onClickPhone(): void;
}

const Shop = (props: Props) => {
    const onClickPhone = () => {
        props.onClickPhone();
    }

    return (
        <div className='shop'>
            <img src={locationIcon} alt='location' />
            <div className='location-dscription'>
                {
                    props.shop.location.map(item => <p data-testid='location' key={item}>{item}</p>)
                }
            </div>
            <img src={phoneIcon} alt='phone' onClick={onClickPhone} />
        </div>
    )
}

export default Shop;