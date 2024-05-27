import {$host, $authHost} from './index';

export const addService = async (type, description) => {
    const {data} = await $authHost.post('api/service/add', {type, description})
    return data
}

export const getAllServices = async (sortName, sortDirection) => {
    const {data} = await $host.get('api/service/getAll', {params: {
        sortName, sortDirection
    }})
    return data
}

export const getTypesByServiceIds = async (ids) => {
    const {data} = await $host.get(`api/service/getTypesByIds/${ids}`)
    return data
}

export const setServiceCashierId = async (id, cashierId) => {
    const {data} = await $authHost.post('api/service/setCashierId', {id, cashierId})
    return data
}

export const getAllServicesWithoutCashier = async () => {
    const {data} = await $host.get('api/service/getAllWithoutCashier')
    return data
}

export const getServiceIdsByCashierId = async (cashierId) => {
    const {data} = await $host.get(`api/service/getIdsByCashierId/${cashierId}`)
    return data
}

export const getAllServicesByCashierId = async (cashierId) => {
    const {data} = await $host.get(`api/service/getAllByCashierId/${cashierId}`)
    return data
}