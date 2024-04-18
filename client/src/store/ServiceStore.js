import {makeAutoObservable} from 'mobx';

class ServiceStore {
    services = []
    constructor() {
        makeAutoObservable(this)
    }

    setServices(services) {
        this.services = services
    }

    addService(service) {
        this.services.push(service)
    }
}

export default new ServiceStore()