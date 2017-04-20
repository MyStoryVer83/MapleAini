function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("Do you wish to board the flight?");
        } else {
            cm.sendOk("The flight has not arrived yet. Come back soon.");
            cm.dispose();
        }
    } else {
        cm.sendOk("Make sure you got a Leafre ticket to travel in this train. Check your inventory.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("Okay, talk to me if you change your mind!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031331, -1);
    cm.warp(200000132);
    cm.dispose();
}