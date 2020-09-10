import { shallow } from 'enzyme';

import { h } from 'preact';
import ThreeDS2Form from './ThreeDS2Form';

const submitMock = jest.fn();
global.HTMLFormElement.prototype.submit = () => submitMock;

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ThreeDS2Form />);
});

describe('<ThreeDS2Form /> rendering', () => {
    it('should render one input field', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    });

    it('should render one <Form>', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });
});