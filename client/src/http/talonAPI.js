import {$host} from "./index";

export const createTalon = async (type, number, userId) => {
    const {data} = await $host.post('api/talon/create', {type, number, userId})
    return data
}

export const getMaxNumberByType = async (number) => {
    const {data} = await $host.get('api/talon/getMaxNumberByType/' + number)
    return data
}

export const getAllTalons = async (types) => {
    const {data} = await $host.get('api/user/getAllTalons', {params: {
        types
    }})
    return data
}