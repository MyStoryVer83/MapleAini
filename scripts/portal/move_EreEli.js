/*
* @Portal - move_EreEli
* @description - ʥ����ħ������
*/

function enter(pi) {
    if (pi.getPlayer().isRideFinished()) {
        pi.warp(101000400);
		return true;
    } 
	return false;
}