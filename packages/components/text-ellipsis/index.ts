/* 
    1. 实现单行文本省略
    2. 实现多行文本省略
    3. 实现省略情况下展示tooltip
       1. 文本内容变化时重新加载
       2. dom大小变化时重新加载
    4. 添加复制功能
    5. 在content部分画中多少复制多少，content添加复制图片


    made 遇到问题了 获取的宽度不是真实的 不知道怎么搞的了

    const observer = new ResizeObserver(update);
    observer.observe(targetRef.value);

    要监听元素的尺寸变化，不然拿到的是之前的值，不是最新的宽度值，操了 找好久
    
*/

import { App } from 'vue';
import OpenEllipsis from './src/ellipsis.vue';

OpenEllipsis.install = (app: App) => {
  app.component(OpenEllipsis.name, OpenEllipsis);
};

export { OpenEllipsis };
export default OpenEllipsis;
