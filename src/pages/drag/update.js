import Store from './store';

const add = (params) => {
    const { list } = Store.getStore()
    Store.setStore({ list: [...list, params.data] })
};

const insert = (params) => {
    const { list } = Store.getStore()
    const { index } = params;
    list.splice(index, 0, params.data)
    Store.setStore({ list: [...list] })
};

const update = {
    add,
    insert
}

// 直接调用iframe内部方法传入新数据
const iframeUpdate = (params) => {
    document.getElementById("my-iframe") &&
        document.getElementById("my-iframe").contentWindow &&
        document.getElementById("my-iframe").contentWindow.update &&
        document.getElementById("my-iframe").contentWindow.update(params);
}

export default (params) => {
    const { type, ...argv } = params;
    if (!type) return Promise.reject()
    return new Promise(r => r())
        .then(() => update[type](argv))
        .then(() => {
            const { list } = Store.getStore()
            iframeUpdate(list)
        })
}
