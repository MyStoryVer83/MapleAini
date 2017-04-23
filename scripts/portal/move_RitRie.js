/*
* @Portal - move_RitRie
* @description - 明珠港至里恩
*/

function enter(pi) {
    if (pi.getPlayer().isRideFinished()) {
        pi.warp(140020300, 0);
		return true;
    } 
	return false;
}