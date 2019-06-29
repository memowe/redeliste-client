new Vue({
    el: '#redeliste',
    data: {
        newPerson: '',
        persons: []
    },
    methods: {
        addPerson: function () {
            this.persons.push({name: this.newPerson});
            this.sortPersons();
            this.newPerson = '';
        },
        sortPersons: function () {
            this.persons.sort((a,b) => a.name.localeCompare(b.name));
        }
    }
})
