	function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("坐上船之后，需要飞很久才能到达目的地。如果你在这里有急事要办的话，请先把事情办完，怎么样？你要上船吗？");
        else{
            cm.sendOk("脚本发生错误，请联系管理员解决.");
            cm.dispose();
        }
    }else{
        cm.sendOk("请在前方购买船票.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("Okay, talk to me if you change your mind!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031045, -1);
    cm.warp(101000301);
    cm.dispose();
}	