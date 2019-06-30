new Vue({
    el: '#redeliste',
    data: {
        newPerson: '',
        persons: []
    },
    computed: {
        sortedPersons: function () {
            var copy = this.persons.concat();
            return copy.sort(
                (a,b) => a.name.localeCompare(b.name)
            );
        }
    },
    methods: {
        addPerson: function () {
            this.persons.push({
                name:   this.newPerson,
                id:     this.persons.length
            });
            this.newPerson = '';
        },
    }
})
