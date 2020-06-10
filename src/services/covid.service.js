import axios from 'axios';

export default {
    getCasesByState() {
        const url = `https://covid-india-cases.herokuapp.com/states`;
        return axios.get(url);
    },

    getTimelineByState() {
        const url = `https://covid-india-cases.herokuapp.com/statetimeline`;
        return axios.get(url);
    }
}