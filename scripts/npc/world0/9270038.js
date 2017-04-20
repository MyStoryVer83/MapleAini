status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("你好我是空姐，你想去废弃都市吗?\r\n#b#L0#买票\r\n#b#L1#出发.");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("5000金币一张票，确定买吗?");
		}else if(selection == 1){
			cm.sendYesNo("真的要去吗?");
		}
		oldSelection = selection;
	}else if(status == 1){
		if(oldSelection == 0){
			cm.gainMeso(-5000);
			cm.gainItem(4031732);
		}else if(oldSelection == 1){
			if(cm.itemQuantity(4031732) > 0){
				var em = cm.getEventManager("AirPlane");
				if(em.getProperty("entry") == "true"){
					cm.warp(540010001);
					cm.gainItem(4031732, -1);
				}else{
					cm.sendOk("飞机已经起飞了，一会再来吧.");
				}
			}else{
				cm.sendOk("你没有 #t4031732# 不能去!");
			}
		}
		cm.dispose();
	}
}