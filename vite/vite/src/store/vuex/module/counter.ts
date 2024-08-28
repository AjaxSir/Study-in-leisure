export default {
    state: {
        counter: 1
    },
    getters: {
        doubleCounter: (state) => state.counter * 2 
    },
    mutations: {
        addCounter: (state: any, data:number) => {
            state.counter += data
        }
    },
    actions: {
        addCounterAction: ({ commit, state }, data:number) => {
            console.log(data,'actions')
            state.counter += data
        }
    }
}