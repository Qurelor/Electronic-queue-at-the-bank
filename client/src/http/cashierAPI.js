import {$host, $authHost} from './index';

export const createCashier = async (userId) => {
    const {data} = await $authHost.post('api/cashier/create', {userId})
    return data
}

export const getCashierIdByUserId = async (userId) => {
    const {data} = await $host.get(`api/cashier/getIdByUserId/${userId}`)
    return data
}

export const getAllCashiers = async (cashierId) => {
    const {data} = await $host.get('api/cashier/getAll', {params: {
        cashierId
    }})
    return data
}

export const getUserIdByCashierId = async (id) => {
    const {data} = await $host.get(`api/cashier/getUserIdById/${id}`)
    return data
}