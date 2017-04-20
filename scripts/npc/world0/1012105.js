/* Ms. Tan 
	Henesys Skin Change.
*/
var status = 0;
var skin = Array(0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("欢迎光临！欢迎来到我们射手村护肤中心。你是不是希望拥有像我一样健康、美丽的肌肤呢？如果你有#b#t5153000##k我们可以为你精心护理肌肤。请相信我们的能力，怎么样要不要试一试？");
    } else if (status == 1) {
        cm.sendStyle("用我们特殊开发的机器可查看护肤后的效果噢，想换成什么样的皮肤呢？请选择～", 5153000, skin);
    } else if (status == 2) {
		if (cm.haveItem(5153000)){
            cm.gainItem(5153000, -1);
            cm.setSkin(selection);
            cm.sendOk("完成了,让朋友们赞叹你的新肤色吧!");
        } else {
            cm.sendOk("看起来你并没有我们的会员卡,我恐怕不能给你护肤,我很抱歉");
        }
        cm.dispose();
    }
}