/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
var duration = 60;
var map = 200090030;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("If you're not interested, then oh well...");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
					var display = "\r\n#L"+i+"##b Ereve (1000 mesos)#k";
				}			
				cm.sendSimple("Eh... So... Um... Are you trying to leave Victoria to go to a different region? You can take this boat to #bEreve#k. There, you will see bright sunlight shinning on the leaves and feel a gentle breeze on your skin. It's where Shinsoo and Empress Cygnus are. Would you like to go to Ereve? It will take about #b2 Minutes#k, and it will cost you #b1000#k mesos.\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("Hmm... Are you sure you have #b1000#k Mesos? Check your Inventory and make sure you have enough. You must pay the fee or I can't let you get on...");
				cm.dispose();
			} else {
            for (var i = 0; i < 10; i++) {
     			if (cm.getPlayerCount(map) == 0) {
                    cm.gainMeso(-1000);
                    cm.getPlayer().setTravelTime(duration);
                    cm.warp(map);
					cm.setClock(cm.getClient(), duration);
                    cm.dispose();
                    return;
                    }
				if (i = 5) {
					map = 200090040
				}  else {	
				    map = map + 2
				}
            } 
				  cm.sendNext("Seems all ships are taken, try again in a bit.");	
				  cm.dispose();
				}
			}
	  }
}