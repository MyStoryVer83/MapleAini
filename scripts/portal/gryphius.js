function enter(pi) {
    if(pi.isQuestStarted(6904) || pi.isQuestStarted(6914) || pi.isQuestStarted(6924) || pi.isQuestStarted(6934) || pi.isQuestStarted(6944)){
        pi.resetMap(924000201);
        pi.warp(924000201, 2);
    } else {
    pi.warp(240020101, "out00");
    }
	return true;	
}