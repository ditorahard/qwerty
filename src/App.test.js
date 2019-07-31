import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {expect} from 'chai';
import {mount} from 'enzyme';

import jsdom from 'jsdom';

Enzyme.configure({adapter: new Adapter()})

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component', () => {
  it('should be handling countResult Default Value', () => {
    const wrapper = shallow(<App  />);
    expect(wrapper.instance().countResult()).equals(0); //error appears here
  });
});

describe('App component', () => {
  it('should be handling countResult Sum', () => {
    const wrapper = shallow(<App  />);
    expect(wrapper.instance().countResult('Sum',1,2)).equals(3); //error appears here
  });
});

describe('App component', () => {
  it('should be handling countResult Multiply', () => {
    const wrapper = shallow(<App  />);
    console.log("Wrapper", wrapper.instance());
    console.log("Wrapper", wrapper.instance().countResult());
    expect(wrapper.instance().countResult('Multiply', 3,4)).equals(12); //error appears here
  });
});

describe('App component', () => {
  it('should be handling countResult Prime', () => {
    const wrapper = shallow(<App  />);
    console.log("Wrapper", wrapper.instance());
    console.log("Wrapper", wrapper.instance().countResult());
    expect(wrapper.instance().countResult('Prime', 4)).to.eql([2,3,5,7]); //error appears here
  });
});

describe('App component', () => {
  it('should be handling countResult Fibonacci', () => {
    const wrapper = shallow(<App  />);
    console.log("Wrapper", wrapper.instance());
    console.log("Wrapper", wrapper.instance().countResult());
    expect(wrapper.instance().countResult('Fibonacci', 4)).to.eql([0,1,1,2]); //error appears here
  });
});