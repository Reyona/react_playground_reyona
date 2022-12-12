class Drag {
    params = {};
    // 声明
    mouseOffsetBottom = 0;
    mouseOffsetRight = 0;
    index = 0; //插入元素的下标
    type = 'add'; //操作类型

    init = (params) => {
        this.params = params;
        const { dragEle, dropEle } = params;
        this.initDrag(dragEle);
        this.initDrop(dropEle);
    };

    //初始化设置拖动元素
    initDrag = dragEle => {
        if (dragEle.childNodes.length) {
            const { length } = dragEle.childNodes;
            let i = 0
            while (i < length) {
                this.setDrag(dragEle.childNodes[i]);
                i += 1;
            }
        } else {
            this.setDrag(dragEle);
        }
    }

    //初始化释放区
    initDrop = dropEle => {
        if (dropEle.childNodes.length) {
            const { length } = dropEle.childNodes;
            let i = 0;
            while (i < length) {
                this.setDrop(dropEle.childNodes[i]);
                i += 1;
            }
        } else {
            this.setDrop(dropEle);
        }
    }

    getIframe = () => this.params.iframe;

    //拖动元素注册事件
    setDrag = el => {
        el.setAttribute("draggable", "true");
        el.ondragstart = this.dragStartEvent; //当用户开始拖动一个元素或者一个选择文本的时候 ，将触发此事件
        el.ondrag = this.dragEvent; // 拖动元素或文本选择时将触发此事件 (拖动过程中，一直触发此事件)
        el.ondragend = this.dragEndEvent; //当拖动操作结束时将触发此事件（通过释放鼠标按钮或按退出键）
    };

    //释放区注册事件
    setDrop = el => {
        el.ondrop = this.dropEvent; //当被拖动元素在释放区里放下时，将触发此事件
        el.ondragenter = this.dragEnterEvent; //被拖动元素进入到释放区所占据得屏幕空间时，将触发此事件
        el.ondragover = this.dragOverEvent; //当被拖动元素在释放区内移动时，将触发此事件
        el.ondragleave = this.dragLeaveEvent; //当被拖动元素没有放下就离开释放区时，将触发此事件
    }

    //创建占位元素
    createElePlaceholder = (() => {
        let ele = null;
        return () => {
            if (!ele) {
                ele = document.createElement("div");
                ele.setAttribute("id", "drag-ele-placeholder");
                ele.innerHTML = `<div style="width: 100%; height:50px; position: relative">
              <div style="width: 150px; height: 40px; text-align: center; position: absolute;
              left: 0; right: 0; top: 0; bottom:0; margin: auto; background: #878; line-height: 40px">放置组件</div>
            </div>`;
            }
            return ele;
        };
    })();

    //移除占位元素
    removePlaceholderEle = () => {
        const iframe = this.getIframe();
        const removeEle = iframe.contentDocument.getElementById("drag-ele-placeholder");
        const { dropEle } = this.params;
        if (removeEle) { dropEle.removeChild(removeEle) };
    }

    //获取iframe的位置
    getIframeOffset = () => {
        const iframeEle = this.getIframe();
        return iframeEle ? this.getRealOffset(iframeEle) : { offsetLeft: 0, offsetTop: 0 };
    };

    //计算元素距离父元素的offset
    getRealOffset = (el, parentName) => {
        const { left, top } = el.getBoundingClientRect();
        return { offsetLeft: left, offsetTop: top };
    }

    //获取元素位置
    getElOffset = el => {
        const { offsetTop: iframeTop } = this.getIframeOffset();
        const { offsetTop: targetOffsetTop } = this.getRealOffset(el);
        return {
            midLine: el.clientHeight / 2 + targetOffsetTop + iframeTop,
            topLine: targetOffsetTop + iframeTop,
            bottomLine: el.clientHeight + targetOffsetTop + iframeTop
        };
    };

    //释放区内部元素位置
    getDropOffset = () => {
        const result = [];
        const { dropEle } = this.params;
        const el = dropEle.childNodes;

        let i = 0;
        while (i < el.length) {
            const midLine = this.getElOffset(el[i]);
            result.push(midLine);
            i += 1;
        }
        return result;
    };


    //位置比较
    locationCompare = (ev) => {
        let inside = false;
        const { dropEle } = this.params;
        console.log(ev.clientX);
        // 拖动元素的位置
        const sourceRight = ev.clientX + this.mouseOffsetRight;
        const sourceLeft = sourceRight - ev.currentTarget.clientWidth;

        const { offsetLeft: iframeLeft } = this.getIframeOffset();
        const { offsetLeft: targetLeft } = this.getRealOffset(dropEle);

        /*释放区的位置*/
        const targetOffsetLeft = iframeLeft + targetLeft;
        const targetOffsetRight = targetOffsetLeft + dropEle.clientWidth;

        if (sourceRight > targetOffsetLeft && sourceLeft < targetOffsetRight) {
            //拖动到释放区
            inside = true;
        } else {
            //释放区外面
            inside = false;
        }
        return inside;

    }

    //插入占位元素
    insertPlaceholderEle = (sourceMidLine) => {
        const dropOffset = this.getDropOffset(); //释放区的位置属性
        const insertEl = this.createElePlaceholder();
        const { dropEle } = this.params;
        const dropEleChild = dropEle.childNodes;
        if (dropOffset.length) {
            dropOffset.map((item, i) => {
                const Ele = dropEleChild[i];
                //在元素前面插入占位元素
                if (sourceMidLine > item.topLine && sourceMidLine < item.midLine) {
                    Ele.before(insertEl);
                    this.index = i;
                    this.type = 'insert'
                }
                //在元素后面插入占位元素
                if (sourceMidLine < item.bottomLine && sourceMidLine > item.midLine) {
                    this.index = i + 1;
                    Ele.after(insertEl);
                    this.type = 'insert'
                }
                //追加一个占位元素
                if (sourceMidLine > dropOffset[dropOffset.length - 1].bottomLine) {
                    dropEle.append(insertEl);
                    this.type = 'add'
                }
                return item;
            });
        }
        //插入第一个占位元素（当iframe内部没有组件）
        if (!dropEleChild.length) {
            this.type = 'add'
            dropEle.append(insertEl);
        }
    }


    /****** 事件处理 ******/
    dragStartEvent = ev => {
        console.log('开始拖拽');
        document.getElementsByClassName("drop-content")[0].style.zIndex = "-1";
        //获得鼠标距离拖拽元素的下边的距离
        this.mouseOffsetBottom = ev.currentTarget.clientHeight - ev.offsetY;
        //获得鼠标距离拖拽元素的右边的距离
        this.mouseOffsetRight = ev.currentTarget.clientWidth - ev.offsetX;
    };

    //拖拽结束
    dragEndEvent = ev => {
        ev.preventDefault();
        document.getElementsByClassName("drop-content")[0].style.zIndex = "0";
        const { callback } = this.params;
        this.locationCompare(ev) &&
            callback &&
            callback({
                type: this.type,
                index: this.index
            });
    };


    // dragEndEvent = ev => {
    //     this.removePlaceholderEle()
    //     console.log('拖拽结束');
    //     console.log('删除占位元素');
    // };
    // //插入占位元素
    // dragEnterEvent = ev => {
    //     ev.preventDefault();
    //     const insertEle = this.createElePlaceholder();
    //     ev.target.before(insertEle);
    //     console.log('进入到可放置区');
    //     console.log('插入占位元素');
    // };
    // //删除占位元素
    // dragLeaveEvent = ev => {
    //     ev.preventDefault();
    //     this.removePlaceholderEle()
    //     console.log('离开放置区');
    //     console.log('删除占位元素');
    // };

    dragEvent = ev => {
        //获取拖拽元素中线距离屏幕上方的距离
        const sourceMidLine =
            ev.clientY + this.mouseOffsetBottom - ev.currentTarget.clientHeight / 2;
        if (this.locationCompare(ev)) {
            this.insertPlaceholderEle(sourceMidLine)
            // console.log('释放区内部')
        } else {
            this.removePlaceholderEle()
            // console.log('释放区外面')
        }
    };
}

export default new Drag();