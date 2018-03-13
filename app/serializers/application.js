import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    normalize: function(typeClass, hash) {
        const json = this._super(...arguments);
        json.data.id = json.data.attributes.title;
        return json;
    },

    serialize: function(snapshot, options){
        let json = {
            'title': snapshot.attr('title'),
            'singer': snapshot.attr('singer')
        }
        return json;
    }
});
