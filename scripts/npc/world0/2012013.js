function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("Do you want to go to Ludibrium?");
        } else {
            cm.sendOk("The train to Ludibrium is ready to take off, please be patience for next one.");
            cm.dispose();
        }
    } else {
        cm.sendOk("Make sure you got a Ludibrium ticket to travel in this train. Check your inventory.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("Okay, talk to me if you change your mind!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031074, -1);
    cm.warp(200000122);
    cm.dispose();
}