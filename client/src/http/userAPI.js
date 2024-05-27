import {$host, $authHost} from './index';

export const registration = async (fullName, email, password, role) => {
    const {data} = await $host.post('api/user/registration', {fullName, email, password, role})
    return data
}

export const auth = async (email, password) => {
    const {data} = await $host.post('api/user/auth', {email, password})
    return data
}

export const getAllUsers = async (sortName, sortDirection) => {
    const {data} = await $authHost.get('api/user/getAll', {params: {
        sortName, sortDirection
    }})
    return data
}

export const checkToken = async (token) => {
    const {data} = await $host.post('api/user/checkToken', {token})
    return data
}

export const getFullNameByUserId = async (id) => {
    const {data} = await $host.get(`api/user/getFullNameById/${id}`)
    return data
}