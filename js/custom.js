~(function () {
    // 获取所有兄弟元素的方法
    let getBrothers = function (ele) {
        let childrens = ele.parentNode.children,
            arr = [];
        [].forEach.call(childrens, function (item) {
            item !== ele ? arr[arr.length] = item : null;
        });
        return arr;
    }

    // hasClass
    let hasClass = function (ele, cls) {
        return ele.className.trim().split(/ +/g).indexOf(cls) >= 0;
    }

    // addClass
    let addClass = function (ele, cls) {
        if (hasClass(ele, cls)) return;
        ele.className += ` ${cls}`;
    }

    // removeClass
    let removeClass = function (ele, cls) {
        if (!hasClass(ele, cls)) return;
        ele.className = ele.className.trim().split(/ +/g).filter(item => cls !== item).join(' ');
    }

    // 获取元素
    let nav = document.querySelector('.db-nav'),
        mask = document.querySelector('.db-mask'),
        sidebar = document.querySelector('.db-sidebar'),
        downBox = document.querySelector('.down-box');

    // 头部菜单
    nav.addEventListener('click', function (ev) {
        ev = ev || window.event;
        let target = ev.target,
            targetName = target.tagName;

        // 合拼事件源
        if (targetName === 'A') {
            target = target.parentNode;
            targetName = target.tagName;
        }

        if (target.className === 'db-learn') {
            addClass(mask, 'show');
            addClass(sidebar, 'show');
            return
        }

        target.className = 'active';
        let brothers = getBrothers(target);
        brothers.forEach(item => {
            let itemClass = item.className;
            item.className = itemClass === 'db-learn' ? 'db-learn' : '';
        });
    });

    // 侧边栏
    sidebar.addEventListener('click', function (ev) {
        ev = ev || window.event;

        let target = ev.target,
            targetName = target.tagName;

        // 合并事件源
        if (targetName === 'A') {
            target = target.parentNode;
            targetName = target.tagName;
        }

        if (targetName === 'LI') {
            let oA = [...target.children][0],
                box = [...target.children][1],
                lis = target.parentNode.children;

            if (hasClass(oA, 'active')) {
                removeClass(oA, 'active');
                removeClass(box, 'show');
                return
            }

            addClass(oA, 'active');
            addClass(box, 'show');

            [].forEach.call(lis, item => {
                if (item !== target) {
                    removeClass([...item.children][0], 'active')
                    removeClass([...item.children][1], 'show')
                }
            });
            
        }
    })

    // 蒙层
    mask.onclick = function () {
        removeClass(this, 'show');
        removeClass(sidebar, 'show');
        removeClass(downBox, 'show');
    };
})();