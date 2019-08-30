new Vue({
    mixins: [serializer],
    el: '#redeliste',
    data: {
        persons: [],
        speakerIDs: [],
        copyIndicator: false
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
        },
        isClearable: function () {
            return  this.persons.some(p => p.spoken == true)
                &&  this.speakerIDs.length == 0;
        },
        isNew: function () {
            return this.persons.length == 0;
        }
    },
    methods: {
        addPerson: function () {
            let name = this.newPersonName();
            if (name.length > 0) {
                this.persons.push({
                    name:   name,
                    id:     this.persons.length,
                    spoken: false,
                });
                this.newPersonNameElement().value = '';
                this.writeToHistory();
            }
        },
        newPersonNameElement: function () {
            return document.getElementById('add-personen-name');
        },
        newPersonName: function () {
            return this.newPersonNameElement().value;
        },
        addSpeaker: function (id) {
            if (this.person(id).spoken) {
                this.speakerIDs.push(id);
            } else {
                var i = this.speakerIDs.findIndex(id => this.person(id).spoken);
                if (i == -1) i = this.speakerIDs.length;
                this.speakerIDs.splice(i, 0, id);
            }
            this.writeToHistory();
        },
        callNextSpeaker: function () {
            this.nextSpeaker.spoken = true;
            this.speakerIDs.shift();
            this.writeToHistory();
        },
        person: function (id) {
            return this.persons.find(e => e.id == id);
        },
        isDisabled: function (id) {
            return this.speakerIDs.includes(id);
        },
        currentURL: function () {
            return window.location.href;
        },
        shareDialog: function () {
            return document.getElementById('share-dialog');
        },
        shareDialogInput: function () {
            return this.shareDialog().querySelector('input');
        },
        copyURL: function () {
            this.shareDialogInput().select();
            document.execCommand('copy');
            this.copyIndicator = true;
        },
        showShareDialog: function () {
            this.copyIndicator = false;
            this.shareDialog().showModal();
            this.shareDialogInput().select();
        },
        closeShareDialog: function () {
            document.getElementById('share-dialog').close();
        },
        clearSpeakers: function () {
            this.persons.forEach(p => p.spoken = false);
            this.speakerIDs = [];
            this.writeToHistory();
        },
        clearAll: function () {
            if (confirm("Alles löschen: dein Ernst!?")) {
                this.persons = [];
                this.clearSpeakers();
            }
        },
        writeToHistory: function () {
            let data = {persons: this.persons, speakerIDs: this.speakerIDs};
            history.pushState(data, document.title, '#' + this.serialize(data));
        },
        readFromString: function (str) {
            try {
                let data = this.deserialize(str);
                this.persons    = data.persons;
                this.speakerIDs = data.speakerIDs;
            }
            catch (e) {
                alert("Fehler beim Laden!");
                console.log(e);
            }
        }
    },
    created: function () {

        // Synchronize state and location
        if (location.hash) {
            this.readFromString(window.location.hash.substring(1));
        }
        else {
            this.writeToHistory();
        }

        // "Enable back button"
        let v = this;
        window.onpopstate = function (e) {
            v.persons       = e.state.persons;
            v.speakerIDs    = e.state.speakerIDs;
        };
    }
})
