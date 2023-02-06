import { useState } from 'react';
import { Carousel } from 'antd';
import './Menu.css';

import { FoodType, ShopType } from '@/types/order';
import MenuItem from '@components/eat/MenuItem';
import addIcon from '@resources/add.png';

interface Props {
    menu: ShopType['menu'];
    addFood?(param: FoodType): void; // used by MenuItem
    renderItem?: any; // if want to use another Component to render item
    [key: string]: any; // used by renderItem if necessary
}

const Menu = ({ menu, addFood = f => f, renderItem = MenuItem, ...props }: Props) => {
    let [currentFood, setCurrentFood] = useState(0);
    let [isSwiping, setIsSwiping] = useState(false);
    let [touchStartX, setTouchStartX] = useState(-1);

    let timer: string | number | NodeJS.Timeout | undefined;

    const onAddFood = () => {
        addFood(menu[currentFood]);
    }

    const afterChange = (currentSlide: number) => {
        // console.log('afterChange:', currentSlide);
        setCurrentFood(currentSlide);
        setIsSwiping(false);
    };
    const onTouchMove = (e: any) => {
        // console.log('onTouchMove:', e);
        if (!isSwiping && Math.abs(e.changedTouches[0].clientX - touchStartX) > 50) setIsSwiping(true);
    }
    const onTouchStart = (e: any) => {
        // console.log('onTouchStart:', e);
        setTouchStartX(e.changedTouches[0].clientX);
    }
    const onTouchEnd = (e: any) => {
        // console.log('onTouchEnd:', e);
        setTouchStartX(-1);
        timer = setTimeout(() => {
            setIsSwiping(false);
        }, 500);
    }
    const itemProps = {
        addFood,
        ...props
    }

    return (
        <div className='menu'>
            <Carousel dots={false} afterChange={afterChange}>
                {
                    menu.map((food) => <div key={food.id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>{renderItem({ food, ...itemProps })}</div>)
                }
            </Carousel>
            <div style={{ opacity: isSwiping ? '0' : '1' }} className={`food-info ${isSwiping ? 'fade-out-down' : 'fade-in-down'}`}>
                <p className='food-name'>{menu[currentFood].name}</p>
                <p className='food-price'>{menu[currentFood].price / 100}$</p>
            </div>
            <img style={{ opacity: isSwiping ? '0' : '1' }} src={addIcon} alt='add' className={`add-button ${isSwiping ? 'fade-out' : 'fade-in'}`} onClick={onAddFood} />
        </div>
    )
}

export default Menu;