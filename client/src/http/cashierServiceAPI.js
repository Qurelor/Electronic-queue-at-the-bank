import {$host} from './index';

export const addServices = async (cashierId, serviceIds) => {
    const {data} = await $host.post('api/cashierService/addServices', {cashierId, serviceIds})
    return data
}

export const getServiceIdsByCashierId = async (cashierId) => {
    const {data} = await $host.get(`api/cashierService/getServiceIdsByCashierId/${cashierId}`)
    return data
}