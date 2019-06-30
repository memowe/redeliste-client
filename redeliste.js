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
        },
        nextSpeaker: function () {
            return this.speakerIDs.length == 0 ? null :
                this.person(this.speakerIDs[0]);
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
        addSpeaker: function (id) {
            this.speakerIDs.push(id);
        },
        callNextSpeaker: function () {
            this.speakerIDs.shift();
        },
        person: function (id) {
            return this.persons.find(e => e.id == id);
        }
    }
})
