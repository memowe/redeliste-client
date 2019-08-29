var serializer = {methods: {
    serialize: function (data) {
        return btoa(pako.deflate(JSON.stringify(data), {to: 'string'}));
    },
    deserialize: function (str) {
        return JSON.parse(pako.inflate(atob(str), {to: 'string'}));
    }
}};
