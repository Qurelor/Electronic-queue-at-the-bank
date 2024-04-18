import {$host} from './index';

export const createCashier = async (userId) => {
    const {data} = await $host.post('api/cashier/create', {userId})
    return data
}

export const getCashierIdByUserId = async (userId) => {
    const {data} = await $host.get(`api/cashier/getIdByUserId/${userId}`)
    return data
}