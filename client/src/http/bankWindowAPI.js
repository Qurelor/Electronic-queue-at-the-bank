import {$host, $authHost} from './index';

export const createBankWindow = async (number) => {
    const {data} = await $authHost.post('api/bankWindow/create', {number})
    return data
}

export const getAllBankWindows = async (sortName, sortDirection, bankWindowId) => {
    const {data} = await $host.get('api/bankWindow/getAll', {params: {
        sortName, sortDirection, bankWindowId
    }})
    return data
}

export const setBankWindowCashierId = async (id, cashierId) => {
    const {data} = await $authHost.post('api/bankWindow/setCashierId', {id, cashierId})
    return data
}

export const getBankWindowNumberById = async (id) => {
    const {data} = await $host.get(`api/bankWindow/getNumberById/${id}`)
    return data
}

export const getAllBankWindowsWithoutCashier = async (sortName, sortDirection) => {
    const {data} = await $host.get('api/bankWindow/getAllWithoutCashier', {params: {
        sortName, sortDirection
    }})
    return data
}

export const getAllBankWindowsWithCashier = async (sortName, sortDirection) => {
    const {data} = await $host.get('api/bankWindow/getAllWithCashier', {params: {
        sortName, sortDirection
    }})
    return data
}

export const getCashierIdByBankWindowId = async (id) => {
    const {data} = await $host.get(`api/bankWindow/getCashierIdById/${id}`)
    return data
}

export const getBankWindowByCashierId = async (cashierId) => {
    const {data} = await $host.get(`api/bankWindow/getByCashierId/${cashierId}`)
    return data
}

export const setBankWindowStatus = async (id, status) => {
    const {data} = await $authHost.post('api/bankWindow/setStatus', {id, status})
    return data
}