import React from 'react';
import App from './App';
import {shallow,mount} from 'enzyme';


describe("App", () => {
  const enzyme = require("enzyme");
  const Adapter = require("enzyme-adapter-react-16");
  enzyme.configure({ adapter: new Adapter() });

  it("builds object correctly to send to server", () => {
    let wrapper = shallow(<App/>);
    const array = ["1","2"];
    wrapper.instance().state.sentenceId = "1";
    let obj = wrapper.instance().sendSentence(array);
    expect(obj.categories).toEqual(array);
    expect(obj.moderator).toEqual("stringa-fissa@da-cambiare.it");
    expect(obj.id).toEqual(wrapper.instance().state.sentenceId);
  });

  it("calls method for get new sentence when rendered",() =>{
      let wrapper = mount(<App/>);
      let spy = spyOn(wrapper.instance(), 'getSentence');
      wrapper.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
  });

  it("renders anything if indicators are not processed yet",() =>{
    let wrapper = shallow(<App/>);
    wrapper.instance().state.indicators="";
    expect(wrapper.find(".container").exists()).toEqual(false);
  });

  it("renders something if indicators are processed",() =>{
    let wrapper = shallow(<App/>);
    wrapper.instance().state.indicators=[];
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".container").exists()).toEqual(true);
  });

  it("renders UI correctly", () =>{
    let wrapper = shallow(<App/>);
    wrapper.instance().state.indicators = true;
    wrapper.instance().state.author = "author";
    wrapper.instance().state.content = "content";
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".user").text().toString()).toEqual(wrapper.instance().state.author);
    expect(wrapper.find(".sentence").text().toString()).toEqual(wrapper.instance().state.content);
  })

  it("calls method getSentence and sendSentence when submit",() =>{
    let wrapper = shallow(<App/>);
    let array = ["1","2"];
    let spy = spyOn(wrapper.instance(), 'sendSentence');
    let spy2 = spyOn(wrapper.instance(), 'getSentence');
    wrapper.instance().handleSubmit(array);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  })

});
