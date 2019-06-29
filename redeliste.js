new Vue({
    el: '#redeliste',
    data: {
        newPerson: '',
        persons: []
    },
    methods: {
        addPerson: function () {
            this.persons.push({name: this.newPerson});
            this.newPerson = '';
        }
    }
})
