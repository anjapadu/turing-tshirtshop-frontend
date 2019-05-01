import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Login } from './index';

describe('Login', () => {
    it('Should render correct errors', () => {

        const wrapper = shallow(<Login />);
        wrapper.setState({
            errorUser: true
        })
        expect(wrapper.instance()._renderErrorMessage().props.children).toBe("The user is wrong. Yoy must enter a valid email address.");
        wrapper.setState({
            errorUser: false,
            errorPassword: true
        })
        expect(wrapper.instance()._renderErrorMessage().props.children).toBe("The password should have at least 8 characters.");
        wrapper.setState({
            errorUser: false,
            errorPassword: false,
            errorMessage: 'USER_NOT_EXIST'
        })
        expect(wrapper.instance()._renderErrorMessage().props.children).toBe("User is not registered");
    });

    it('Should submit correctly', () => {
        const wrapper = mount(<Login />)
        const spy = jest.spyOn(wrapper.instance(), '_resetErrors')
        wrapper.update();
        wrapper.instance()._onSubmit();
        expect(spy).toHaveBeenCalled();
    })

});