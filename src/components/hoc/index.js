import React, { useEffect, useState } from "react";

const MyHoc = (WrappedComp) => {
    // 在这里直接return一个匿名hook组件的话，还是会报错说useState只能用在hook组件里，所以必须要先定个名字
    const NewCompWithHoc = (props) => {
        const [name, setName] = useState('');

        const onNameChange = (e) => {
            setName(e.target.value);
            console.log('onNameChange: ', e.target.value);
        }

        return (<WrappedComp {...props} vaule={ name } onChange={ onNameChange } />);
    }
    return NewCompWithHoc;
}

export default MyHoc;