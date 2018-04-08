// Client / Components / Pages / Tweet

import React from 'react';
import { connect } from 'react-redux';
import '../common/css/less/input-moment.less';
// import '../common/css/app.less';

import { validateTweet } from '../../../shared/validations/tweets';
import { tweetRequest } from '../../actions/pages/tweet';
import { flashMessageAdd } from '../../actions/flash-messages';
import InputTextarea from '../common/inputs/textarea';
import Text from '../common/inputs/text';
import InputMoment from "input-moment";
import moment from 'moment';


class TweetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parentMobile: '',
            reason: '',
            errors: {},
            m1: moment(),
            m2: moment(),
            isLoading: false,
            moment: Date.now()
        };
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    // isValid() {
    //     const { errors, isValid } = validateTweet(this.state.reason);
    //     if(!isValid) {
    //         this.setState({ errors });
    //     }
    //     return isValid;
    // }
    onSubmit(event) {
        event.preventDefault();
        if(true) {
            this.setState({errors: {}, isLoading: true});
            this.props.tweetRequest(this.state).then(
                (response) => {
                    console.log(response);
                    this.props.flashMessageAdd({
                        type: 'success',
                        text: 'Tweet sent!'
                    });
                    this.setState({isLoading: false, tweet: ''});
                    this.context.router.push('/');
                },
                (error) => {
                    console.log(11111111111111111111111)
                    console.log(error.response.data);
                    this.setState({errors: error.response.data.errors, isLoading: false});
                }
            );
        }
    }
    handleChange(m){
        this.setState({ m1: m });
    };
    handleChange2(m) {
        this.setState({ m2: m });
    };
    handleSave() {
        console.log('saved', this.state.m1.format('llll'));
    };

    render() {
        return (
            <section>
                <h2>Leave form</h2>
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <Text 
                        type="text"
                        value={this.state.parentMobile}
                        onChange={this.onChange.bind(this)}
                        name="parentMobile"
                        id="user-parentMobile"
                        label="ParentMobile"
                        placeholder="Enter mobile Number"
                    />
                    <InputTextarea
                        error={ this.state.errors.tweet }
                        value={ this.state.reason }
                        onChange={ this.onChange.bind(this) }
                        name="reason"
                        id="reason"
                        label="Reason"
                        placeholder="Enter the reason"
                        rows="3"
                    />
                    <div className="row">
                    <div className="col-md-6">
                        <Text type="text" id="m1" label="From" value={this.state.m1.format('llll')} readOnly />
                        <InputMoment
                            moment={this.state.m1}
                            onChange={this.handleChange.bind(this)}
                            onSave={this.handleSave.bind(this)}
                            name = "m1"
                            minStep={1} // default
                            hourStep={1} // default
                            prevMonthIcon="ion-ios-arrow-left" // default
                            nextMonthIcon="ion-ios-arrow-right" // default
                        />
                        </div>
                        <div className="col-md-6">
                        <Text type="text" id="m2" label="To" value={this.state.m2.format('llll')} readOnly />
                        <InputMoment
                            moment={this.state.m2}
                            onChange={this.handleChange2.bind(this)}
                            onSave={this.handleSave.bind(this)}
                            minStep={1} // default
                            hourStep={1} // default
                            prevMonthIcon="ion-ios-arrow-left" // default
                            nextMonthIcon="ion-ios-arrow-right" // default
                        />
                        </div>
                    </div>
                    <button type="submit" disabled={ this.state.isLoading } className="btn btn-default">Submit</button>
                </form>
            </section>
        );
    }
}

TweetPage.propTypes = {
    tweetRequest: React.PropTypes.func.isRequired,
    flashMessageAdd: React.PropTypes.func.isRequired
};

TweetPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect((state) => { return {} }, { tweetRequest, flashMessageAdd })(TweetPage);