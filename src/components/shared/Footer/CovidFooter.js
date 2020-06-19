import React from 'react';
import {Icon} from 'semantic-ui-react';
export default class CovidFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <footer>
                <a href="https://github.com/charan94/covid-tracker" rel="noopener noreferrer" target="_blank" style={{color: '#000'}}><h5 style={{textAlign: 'center'}}>See project on <Icon color="black" name="github"></Icon></h5></a>
                </footer>
            </div>
        )
    }

}