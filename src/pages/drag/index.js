// 【可视化搭建平台之跨iframe拖拽 https://juejin.cn/post/6933385955789406222】
import React, { useState, useEffect } from 'react';
import Drag from './drag.js';
import update from './update';

require('./index.css');

const callback = params => {
    update({ ...params, data: { name: new Date().getTime() } })
}

const init = () => {
    setTimeout(() => {
        const iframe = document.getElementById('my-iframe');
        Drag.init({
            dragEle: document.getElementById('drag-box'),
            dropEle: iframe.contentDocument.getElementById('drop-box'),
            iframe,
            callback,
        })
    }, 500);
}

//iframe hooks
const useIframeLoad = () => {
    const [iframeState, setIframeState] = useState(false);
    const [windowState, setWindowState] = useState(document.readyState === "complete");

    const iframeLoad = () => {
        const iframeEle = document.getElementById("my-iframe");
        iframeEle && setIframeState(iframeEle.contentDocument.readyState === "complete");
        if (!iframeState && iframeEle) {
            iframeEle.onload = () => {
                setIframeState(true);
                init();
            };
        }
    };
    useEffect(() => {
        if (!windowState) {
            setIframeState(false);
            window.addEventListener('load', () => {
                setWindowState(true);
                iframeLoad();
            })
        } else {
            iframeLoad();
        }
    }, []);
    return iframeState;
}


export default () => {
    useIframeLoad();

    return <>
        {/* 组件区 */}
        <div id="drag-box">
            <div className="drag-item">可拖拽组件</div>
            <div className="drag-item">可拖拽组件</div>
            <div className="drag-item">可拖拽组件</div>
        </div>
        {/* 预览区 */}
        <div className="drop-content">
            <iframe id="my-iframe" src="/drag-iframe" style={{ width: "100%", height: "100%", border: "none" }} />
        </div>
    </>
}
