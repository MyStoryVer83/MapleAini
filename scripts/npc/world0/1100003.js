/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Victoria Island");
var duration = 60;
var map = 200090031;

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
					var display = "\r\n#L"+i+"##b Victoria Island (1000 mesos)#k";
				}			
				cm.sendSimple("Eh, Hello...again. Do you want to leave Ereve and go somewhere else? If so, you've come to the right place. I operate a ferry that goes from #bEreve#k to #bVictoria Island#k, I can take you to #bVictoria Island#k if you want... You'll have to pay a fee of #b1000#k Mesos.\r\n"+display);
			
		} else if(status == 1) {
			 if(cm.getMeso() < 1000) {
				cm.sendNext("Hmm... Are you sure you have #b1000#k Mesos? Check your Inventory and make sure you have enough. You must pay the fee or I can't let you get on...");
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
					map = 200090051
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