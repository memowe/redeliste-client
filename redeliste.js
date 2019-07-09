Vue.component('person', {
    props: ['person', 'disabled'],
    template: `
        <li><button
            v-bind:disabled="disabled"
            v-on:click="$emit('add-speaker')"
        >
            {{ person.name }}
            <span v-if="!person.spoken">*</span>
        </button></li>
    `
})

Vue.component('add-person', {
    props: ['value'],
    template: `
        <p id="add-person">
            <input
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-on:keyup.enter="$emit('add-person')"
            >
            <button
                v-on:click="$emit('add-person')"
            >Hinzufügen</button>
        </p>
    `
})

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
                id:     this.persons.length,
                spoken: false,
            });
            this.newPerson = '';
        },
        addSpeaker: function (id) {
            if (this.person(id).spoken) {
                this.speakerIDs.push(id);
            } else {
                var i = this.speakerIDs.findIndex(id => this.person(id).spoken);
                if (i == -1) i = this.speakerIDs.length;
                this.speakerIDs.splice(i, 0, id);
            }
        },
        callNextSpeaker: function () {
            this.nextSpeaker.spoken = true;
            this.speakerIDs.shift();
        },
        person: function (id) {
            return this.persons.find(e => e.id == id);
        },
        isDisabled: function (id) {
            return this.speakerIDs.includes(id);
        }
    }
})
