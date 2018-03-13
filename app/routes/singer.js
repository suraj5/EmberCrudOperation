import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import Ember from 'ember';

export default Route.extend({

    flashMessages: Ember.inject.service(),
    
    model() {
        return  RSVP.hash({
           singerList: this.store.findAll('metallica'),
        });      
    },

    actions: {

        deleteSinger(singer){
            singer.unloadRecord();
            this.get('flashMessages').danger('Singer Deleted Successfully')  
        },

        saveRecord() {
            let title = document.querySelector('input[name="title"]:checked').value;
            let singer = document.getElementsByName('singer')[0].value;
          
            //Checks whether singer input has number
            if(singer.match(/\d/g)){
                this.get('flashMessages').danger('Numbers are not accepted')
                return;
            }
            if(singer.toString().length< 5) {
                this.get('flashMessages').danger('Singer name should have atleast 5 characters')
                return;
            }

            //Checks whether any singer exists for the title  
            if(!(this.store.hasRecordForId('metallica',title))){
                //Creating new track record
                let newTrack = this.store.createRecord('metallica', {
                    'title': title,
                    'singer': document.getElementsByName('singer')[0].value
                });
                //POST request 
                newTrack.save();
                //Flash Message
                this.get('flashMessages').success('Singer Created Successfully')
            }
            else {
                this.get('flashMessages').success('Singer already exist for the title');
            }
        },

        transitionToUpdateSinger(singer){
            this.transitionTo('singer-detail',singer );
        }

    }
});
