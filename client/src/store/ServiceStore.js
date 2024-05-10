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

    deleteService(id) {
        this.services = this.services.filter(service => service.id != id)
    }
}

export default new ServiceStore()