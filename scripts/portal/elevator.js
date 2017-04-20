/*
function enter(pi) {
	var em = pi.getEventManager("elevator");
	if (pi.getPlayer().getMapId() == 222020200) {
		if(em.getProperty("goingDown") == "true"){
			pi.getPlayer().changeMap(222020210);
		} else {
			pi.getPlayer().dropMessage(5, "The elevator is moving.");
		}
	} else if (pi.getPlayer().getMapId() == 222020100) {
		if(em.getProperty("goingUp") == "true"){
			pi.getPlayer().changeMap(222020110);
		}else{
			pi.getPlayer().dropMessage(5, "The elevator is moving.");
		}
	}
}*/
function enter(pi) {
    try {
        var elevator = pi.getEventManager("elevator");
        if (elevator == null) {
            pi.getPlayer().dropMessage(5, "The elevator is currently moving.");
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("false")) {
            pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
            elevator.getIv().invokeFunction(pi.getMapId() == 222020110 ? "goUp" : "goDown");
			return true;
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")).equals("true")) {
            pi.getPlayer().dropMessage(5, "The elevator is currently moving.");
        }
    } catch(e) {
        pi.getPlayer().dropMessage(5, "Error: " + e);
    }
	return false;
}  