

var status = 0;
var ticketSelection = -1;
var text = "车票读取中………….";
var hasTicket = false;
var NLC = false;

function start() {
	cm.sendSimple("请出示您的证件.\n\r\n#L0##b前往地铁#l\r\n#L1##b前往废都广场#l\n\n\r\n#L2#前往工地#l\r\n#L3#前往新叶城#l");
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
                text += " 读取完毕，您想进入这里吗?#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("别耍我!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 3) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("别耍我.");
	    		cm.dispose();
	    		return;
        	}
        	var em = cm.getEventManager("Subway");
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("车里还有足够的位置，你想上车吗？");
            } else {
                cm.sendNext("再过一会吧，刚走了一趟车.");
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