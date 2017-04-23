/*
* @Portal - move_RieRit
* @description - 里恩至明珠港
*/

function enter(pi) {
    if (pi.getPlayer().isRideFinished()) {
        pi.warp(104000000, 3);
		return true;
    } 
	return false;
}