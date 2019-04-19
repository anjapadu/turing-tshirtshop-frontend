import React from "react";
import { create } from "react-test-renderer";

import Button from './index';
import { Provider } from 'react-redux';
const initialState = {

};

let store;


describe("Button component", () => {

    test("It renders and shows correct text", () => {
        const component = create(<Button
            text={"ButtonName"}
            onClick={() => { }}
            isLarge
            color={"blue"}
        />);
        const rootInstance = component.root;
        const a = rootInstance.findByType("a");
        console.log({ a: a.props });
        expect(a.props.children).toBe("ButtonName");
        // expect(a.props)
    });
    // test("It ")

})