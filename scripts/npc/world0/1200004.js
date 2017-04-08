/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/
var duration = 60;

function start() {
    cm.sendYesNo("Are you thinking about leaving Rien? If you board this ship, I'll take you from #bRien#k to #bLith Harbor#k... But you must pay a #bfee of 800#k Mesos. Would you like to head over to Lith Harbor now? It'll take about a minute to get there.");
}

function action(mode) {
    if (mode == 0) {
        cm.sendNext("Hmm, you don't want to go? Suit yourself. If you ever change your mind, please let me know.");
    } else if (mode == 1) {
        if (cm.getPlayer().getMeso() < 800) {
            cm.sendNext("Hmm... Are you sure you have #b800#k Mesos? Check your Inventory and make sure you have enough. You must pay the fee or I can't let you get on.");
        } else {
            for (var i = 0; i < 10; i++) {
                if (cm.getPlayerCount(200090060 + i) == 0) {
                    cm.gainMeso(-800);
                    cm.getPlayer().setTravelTime(duration);
                    cm.warp(200090060 + i);
					cm.setClock(cm.getClient(), duration);
                    cm.dispose();
                    return;
                }
            } cm.sendNext("Seems all ships are taken, try again in a bit.");
        }
    } cm.dispose();
}