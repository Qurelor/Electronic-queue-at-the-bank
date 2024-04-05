import {$host} from "./index";

export const createBankWindow = async (number) => {
    const {data} = await $host.post('api/bankWindow/create', {number})
    return data
}

export const getAllBankWindows = async (sortName, sortDirection) => {
    const {data} = await $host.get('api/bankWindow/getAll', {params: {
        sortName, sortDirection
    }})
    return data
}

export const setBankWindowUserId = async (number, userId) => {
    const {data} = await $host.post('api/bankWindow/setUserId', {number, userId})
    return data
}