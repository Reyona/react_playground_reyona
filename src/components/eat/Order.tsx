import './Order.css';
import OrderItem from '@components/eat/OrderItem';
import { FoodType, OrderType} from '@/types/order';
import plateImg from '@resources/plate.svg';

interface Props {
    order: OrderType;
    removeFood?(food: FoodType): void; // used by OrderItem
    renderItem?: any; // if want to use another Component to render item
    [key: string]: any; // used by renderItem if necessary
}

const BlankItem = () => <div style={{width: '85px', height: '100px'}}></div>

const Order = ({order, removeFood = f => f, renderItem = OrderItem, ...props}: Props) => {
    const itemProps = {
        removeFood,
        ...props
    }
    return (
        <div className='order'>
            <div className='plate'><img src={plateImg} alt="plate" /></div>
            <div className='row' style={{top: '-5px'}}>
                { order.drink ? renderItem({food: order.drink, ...itemProps}) : null }
            </div>
            <div className='row' style={order.drink ? {top: '35px', maxHeight: '60px'} : {top: '0', maxHeight: '80px'}}>
                { order.main ? renderItem({food: order.main, ...itemProps}) : <BlankItem /> }
                { order.snack ? renderItem({food: order.snack, ...itemProps}) : <BlankItem /> }
            </div>
            
        </div>
    )
}

export default Order;