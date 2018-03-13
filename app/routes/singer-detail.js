import Route from '@ember/routing/route';
import Ember from 'ember';
import { set, get } from '@ember/object';
export default Route.extend({

    singer:null,

    flashMessages: Ember.inject.service(),

    model(singer){

        return singer;
    },

    actions:{

        updateRecord(singer){
    
            let updatedSinger  = document.getElementsByName('singerName')[0].value;
            if(updatedSinger.match(/\d/g)){
                this.get('flashMessages').danger('Numbers are not accepted')
                return;
            }
            //Update and PUT request
            singer.set('singer', updatedSinger);
            singer.save()
              

            this.get('flashMessages').success('Singer updated successfully')
            this.transitionTo('singer');

        }
    }
});

