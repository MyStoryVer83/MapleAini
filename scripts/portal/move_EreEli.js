/*
* @Portal - move_EreEli
* @description - 圣地至魔法密林
*/

function enter(pi) {
    if (pi.getPlayer().isRideFinished()) {
        pi.warp(101000400);
		return true;
    } 
	return false;
}