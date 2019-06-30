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
        },
        followingSpeakers: function () {
            if (this.speakers.length <= 1) return null;
            return this.speakers.slice(1);
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
        },
        isDisabled: function (id) {
            if (this.speakerIDs.length == 0) return false;
            return this.speakerIDs[this.speakerIDs.length -1] == id;
        }
    }
})
