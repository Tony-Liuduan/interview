import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
window.addEventListener('click', event => {
    console.log('window');
});

document.addEventListener('click', event => {
    console.log('document:bedore react mount');
});

document.body.addEventListener('click', event => {
    // event.stopPropagation();
    console.log('body');
});

function App() {
    function documentHandler(event: any) {
        console.log('document within react');
    }

    useEffect(() => {
        document.addEventListener('click', documentHandler);
        return () => {
            document.removeEventListener('click', documentHandler);
        };
    }, []);

    return (
        <div
            onClick={event => {
                console.log('raect:container');
            }}
        >
            <button
                onClick={event => {
                    console.log('react:button');
                }}
            >
                CLICK ME
            </button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener('click', event => {
    console.log('document:after react mount');
});

/*
react:button
raect:container
body
document:bedore react mount
document:after react mount
document within react
window
 */

/*
react:button
raect:container
body
 */

/* 16 / 17 事件委托区别 https://juejin.cn/post/6964257086859378724 */
