/*
* @Portal - move_EliEre
* @description - 魔法密林至圣地
*/

function enter(pi) {
    if (pi.getPlayer().isRideFinished()) {
        pi.warp(130000210);
		return true;
    } 
	return false;
}