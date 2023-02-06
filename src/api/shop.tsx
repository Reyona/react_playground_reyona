import { get, post } from '@/common/request'
import { ShopType } from '@/types/order';

export const QUERY_SHOP_INFO_URL = '/api/shop/queryShopInfo.action';

export interface QueryShopRequest {
    id: string;
}

export type QueryShopResponse = ShopType | undefined;

export function queryShopInfo(param: QueryShopRequest):Promise<QueryShopResponse> {
    return get(QUERY_SHOP_INFO_URL, param);
}