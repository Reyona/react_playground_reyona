import { FoodType } from '@/types/order';
import './MenuItem.css';
import starIcon from '@resources/star.svg';

interface Props {
  food: FoodType;
}

const MenuItem = ({ food }: Props) => {

  return (
    <div className='menu-item' data-testid='menu-item'>
      <img src={food.banner} alt={food.name} className='food-banner' />
      <div className={`stars stars-${food.bannerStars}`}>
        <img src={starIcon} alt='star' className='star-icon large' />
        <img src={starIcon} alt='star' className='star-icon medium' />
        <img src={starIcon} alt='star' className='star-icon small' />
      </div>
    </div>
  );
}

export default MenuItem;