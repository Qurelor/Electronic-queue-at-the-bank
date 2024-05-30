import {$host, $authHost} from './index';

export const createTalon = async (number, status, serviceId) => {
    const {data} = await $authHost.post('api/talon/create', {number, status, serviceId})
    return data
}

export const getTalonMaxNumberByServiceId = async (serviceId) => {
    const {data} = await $host.get(`api/talon/getMaxNumberByServiceId/${serviceId}`)
    return data
}

export const getAllTalons = async (serviceIds, status) => {
    const {data} = await $host.get(`api/talon/getAll`, {params: {
        serviceIds, status
    }})
    return data
}

export const setTalonBankWindowId = async (id, bankWindowId) => {
    const {data} = await $authHost.post('api/talon/setBankWindowId', {id, bankWindowId})
    return data
}

export const setTalonStatus = async (id, status, bankWindowId) => {
    const {data} = await $authHost.post('api/talon/setStatus', {id, status, bankWindowId})
    return data
}

export const getServicedTalonByBankWindowId = async (bankWindowId) => {
    const {data} = await $host.get(`api/talon/getServicedTalonByBankWindowId/${bankWindowId}`)
    return data
}

export const getUnservicedTalonByUserId = async (userId) => {
    const {data} = await $host.get(`api/talon/getUnservicedTalonByUserId/${userId}`)
    return data
}

export const getLastTalonByUserId = async (userId) => {
    const {data} = await $host.get(`api/talon/getLastTalonByUserId/${userId}`)
    return data
}