import React, { useState } from 'react';
import MyHoc from '@components/hoc';

// @MyHoc @装饰器只能用在类组件上
const MyComponent = (props) => {
    return (
        <>
            <input {...props} />
        </>
    )
}

const NewComp = MyHoc(MyComponent);

const HocPage = () => {
    return (
        <>
            <NewComp />
        </>
    )
}

export default HocPage;