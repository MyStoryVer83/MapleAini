status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("������ǿս㣬����ȥ�¼�����?\r\n#b#L0#��Ʊ\r\n#b#L1#����.");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("5000���һ��Ʊ��Ҫ����?");
		}else if(selection == 1){
			cm.sendYesNo("�����Ư���ģ�Ҫȥ��?");
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
					cm.sendOk("�Բ����Ѿ���������Ժ�����.");
				}
			}else{
				cm.sendOk("û�� #t4031731# ����ȥ��!");
			}
		}
		cm.dispose();
	}
}