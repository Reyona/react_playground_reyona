import { useEffect, useState } from 'react';
import recommendIcon from '@resources/recommend.svg';
import mainIcon from '@resources/main.svg';
import drinkIcon from '@resources/drink.svg';
import snackIcon from '@resources/snack.svg';
import './Header.css'

type HeaderItemType = {
    icon: string;
    description: string;
    actived?: boolean;
}

export const headerItems: Array<HeaderItemType> = [
    {
        icon: recommendIcon,
        description: 'recommend',
    },
    {
        icon: mainIcon,
        description: 'main',
    },
    {
        icon: drinkIcon,
        description: 'drink',
    },
    {
        icon: snackIcon,
        description: 'snack',
    },
];

interface Props {
    onChange(item: HeaderItemType, index: number): void;
}

const Header = (props: Props) => {
    const [headers, setHeaders] = useState(headerItems);

    const onClickItem = (item: HeaderItemType, index: number) => {
        if (item.actived) return;
        props.onChange(item, index);
    };

    useEffect(() => {
        // init the header status
        const newHeaders = headers.map((item:HeaderItemType, index) => ({
            ...item,
            actived: index === 0,
        }))
        setHeaders(newHeaders)
    }, []);

    return (
        <div className="header">
            {
                headers.map((item, index) => <img src={item.icon} key={item.description} alt={item.description} onClick={() => onClickItem(item, index)} />)
            }
        </div>
    )
}

export default Header;