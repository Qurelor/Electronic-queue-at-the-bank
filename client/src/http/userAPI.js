import {$host} from './index';

export const registration = async (fullName, email, password, role) => {
    const {data} = await $host.post('api/user/registration', {fullName, email, password, role})
    return data
}

export const auth = async (email, password) => {
    const {data} = await $host.post('api/user/auth', {email, password})
    return data
}

export const getAllUsers = async (sortName, sortDirection) => {
    const {data} = await $host.get('api/user/getAll', {params: {
        sortName, sortDirection
    }})
    return data
}