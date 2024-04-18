import {$host} from './index';

export const createTalon = async (number, serviceId, userId) => {
    const {data} = await $host.post('api/talon/create', {number, serviceId, userId})
    return data
}

export const getTalonMaxNumberByServiceId = async (serviceId) => {
    const {data} = await $host.get(`api/talon/getMaxNumberByServiceId/${serviceId}`)
    return data
}

export const getAllTalons = async (serviceIds) => {
    const {data} = await $host.get(`api/talon/getAll/${serviceIds}`)
    return data
}

export const setTalonBankWindowId = async (id, bankWindowId) => {
    const {data} = await $host.post('api/talon/setBankWindowId', {id, bankWindowId})
    return data
}

export const setTalonIsActualFalse = async (id) => {
    const {data} = await $host.post('api/talon/setIsActual', {id})
    return data
}