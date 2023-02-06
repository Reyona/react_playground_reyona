export type FoodCatelog = 'main' | 'drink' | 'snack';

export type BannerStarsStyle = 0 | 1 | 2 | 3; // 星星效果

export interface FoodType {
    id: string,
    type: FoodCatelog,
    price: number,
    name: string,
    banner: string, // 选菜预览图1
    bannerAnimation: string, // 选菜预览图2（可动部分）
    bannerStars: BannerStarsStyle,
    preview: string, // 餐盘预览图
}
export interface CustomerType {
    id: string,
    location: string,
    telephone: string,
}

export interface ShopType {
    id: string,
    location: Array<string>,
    telephone: string,
    menu: Array<FoodType>,
}

export interface OrderType {
    drink?: FoodType,
    main?: FoodType,
    snack?: FoodType,
    totalPrice: number,
    shop?: ShopType,
    customer?: CustomerType,
}