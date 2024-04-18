import {makeAutoObservable} from 'mobx';

class TalonStore {
    talons = []
    constructor() {
        makeAutoObservable(this)
    }

    setTalons(talons) {
        this.talons = talons
    }
}

export default new TalonStore()