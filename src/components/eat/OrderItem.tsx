import { FoodType } from '@/types/order';
import './OrderItem.css';

interface Props {
    food: FoodType;
    removeFood?(food: FoodType): void;
}

const OrderItem = ({ food, removeFood = f => f }: Props) => {
    const onRemoveFood = () => {
        removeFood(food);
    }

    return (
        <div className='order-item zoom-in-top-right'>
            <img src={food.preview} alt={food.name} />
            <div className='hit-area' data-testid='hit-area' onClick={onRemoveFood}></div>
        </div>
    );
}

export default OrderItem;