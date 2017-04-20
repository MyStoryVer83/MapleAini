

var status = 0;
var ticketSelection = -1;
var text = "��Ʊ��ȡ�С�������.";
var hasTicket = false;
var NLC = false;

function start() {
	cm.sendSimple("���ʾ����֤��.\n\r\n#L0##bǰ������#l\r\n#L1##bǰ���϶��㳡#l\n\n\r\n#L2#ǰ������#l\r\n#L3#ǰ����Ҷ��#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		cm.warp(103000101);
    		cm.dispose();
    		return;
        } else if (selection == 1) {
    		var train = cm.getEventManager("KerningTrain");
        	train.newInstance("KerningTrain");
        	train.setProperty("player", cm.getPlayer().getName());
        	train.startInstance(cm.getPlayer());
        	cm.dispose();
        	return;
        } else if (selection == 2) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += " ��ȡ��ϣ��������������?#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("��ˣ��!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 3) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("��ˣ��.");
	    		cm.dispose();
	    		return;
        	}
        	var em = cm.getEventManager("Subway");
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("���ﻹ���㹻��λ�ã������ϳ���");
            } else {
                cm.sendNext("�ٹ�һ��ɣ�������һ�˳�.");
                cm.dispose();
                return;
            }
        }
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(103000897 + (ticketSelection * 3));
                hasTicket = false;
                cm.dispose();
                return;
            }
    	}
	    if (cm.haveItem(4031711)) {
		   	cm.gainItem(4031711, -1);
	        cm.warp(600010004);
	    	cm.dispose();
	    	return;
		}
    }
}