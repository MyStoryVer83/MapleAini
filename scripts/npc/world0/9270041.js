status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("你好我是空姐，你想去新加坡吗?\r\n#b#L0#买票\r\n#b#L1#出发.");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("5000金币一张票，要买吗?");
		}else if(selection == 1){
			cm.sendYesNo("那里很漂亮的，要去吗?");
		}
		oldSelection = selection;
	}else if(status == 1){
		if(oldSelection == 0){
			cm.gainMeso(-5000);
			cm.gainItem(4031731);
		}else if(oldSelection == 1){
			if(cm.itemQuantity(4031731) > 0){
				var em = cm.getEventManager("AirPlane");
				if(em.getProperty("entry") == "true"){
					cm.warp(540010100);
					cm.gainItem(4031731, -1);
				}else{
					cm.sendOk("对不起，已经起飞了请稍后再来.");
				}
			}else{
				cm.sendOk("没有 #t4031731# 不能去的!");
			}
		}
		cm.dispose();
	}
}