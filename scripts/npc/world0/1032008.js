	function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("坐上船之后，需要飞很久才能到达目的地。如果你在这里有急事要办的话，请先把事情办完，怎么样？你要上船吗？");
        else{
            cm.sendOk("本次航班已经出发，请等待下一次航班。");
            cm.dispose();
        }
    }else{
        cm.sendOk("你确认你的背包中有前往天空之城的船票。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("你还有什么事情在这里没有完成吗？");
		cm.dispose();
		return;
    }
    cm.gainItem(4031045, -1);
    cm.warp(101000301);
    cm.dispose();
}	