import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=utf-8'
    },
    namespace:'/RESTfulExample/rest/json',
    host: 'http://localhost:8080',
    
    buildURL: function(modelName, id, snapshot, requestType, query) {
    switch (requestType) {
      case 'findRecord':
        return this.urlForFindRecord(id, modelName, snapshot);
      case 'findAll':
        return this.urlForFindAll(modelName);
      case 'query':
        return this.urlForQuery(query, modelName);
      case 'queryRecord':
        return this.urlForQueryRecord(query, modelName);
      case 'findMany':
        return this.urlForFindMany(id, modelName, snapshot);
      case 'findHasMany':
        return this.urlForFindHasMany(id, modelName);
      case 'findBelongsTo':
        return this.urlForFindBelongsTo(id, modelName);
      case 'createRecord':
        return this.urlForCreateRecord(modelName, snapshot);
      case 'updateRecord':
        return this.urlForUpdateRecord(id, modelName, snapshot);
      case 'deleteRecord':
        return this.urlForDeleteRecord(id, modelName, snapshot);
      default:
        return this._buildURL(modelName, id);
    }
  },

    urlForFindAll(modelName) {
        var url = this.host+ this.namespace+ '/metallica/get'
        return url
    },

    urlForFindRecord(id, modelName, snapshot) {
        var url = this.host+ this.namespace+ '/metallica/'+snapshot.attr('title');
        return url
    },

    urlForDeleteRecord(id, modelName, snapshot) {
        var url = this.host+ this.namespace+ '/metallica/'+snapshot.attr('title');
        return url
    },

    urlForCreateRecord(id, modelName, snapshot) {
        var url = this.host+ this.namespace+ '/metallica/post'
        return url
    },

    urlForUpdateRecord(id, modelName, snapshot) {
        var url = this.host+ this.namespace+ '/metallica/'+snapshot.attr('title');
        return url
    },

    updateRecord: function (store, type, snapshot) {
      var data = {};
      var serializer = store.serializerFor(type.modelName);
  
      serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
  
      var id = snapshot.id;
      var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');
  
      return this.ajax(url, 'PUT', { data: data });
    }

})