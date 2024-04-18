import {$host} from './index';

export const addService = async (type, description) => {
    const {data} = await $host.post('api/service/add', {type, description})
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