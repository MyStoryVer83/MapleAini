status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("������ǿս㣬����ȥ����������?\r\n#b#L0#��Ʊ\r\n#b#L1#����.");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("5000���һ��Ʊ��ȷ������?");
		}else if(selection == 1){
			cm.sendYesNo("���Ҫȥ��?");
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
					cm.sendOk("�ɻ��Ѿ�����ˣ�һ��������.");
				}
			}else{
				cm.sendOk("��û�� #t4031732# ����ȥ!");
			}
		}
		cm.dispose();
	}
}