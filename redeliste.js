new Vue({
    el: '#redeliste',
    data: {
        newPerson: '',
        persons: [],
        speakerIDs: []
    },
    computed: {
        sortedPersons: function () {
            var copy = this.persons.concat();
            return copy.sort(
                (a,b) => a.name.localeCompare(b.name)
            );
        },
        speakers: function () {
            return this.speakerIDs.map(this.person);
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
        person: function (id) {
            return this.persons.find(e => e.id == id);
        }
    }
})
