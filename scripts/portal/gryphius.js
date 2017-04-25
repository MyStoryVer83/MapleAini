function enter(pi) {
    if(pi.isQuestStarted(1451) || pi.isQuestStarted(1453) || pi.isQuestStarted(1455) || pi.isQuestStarted(1457) || pi.isQuestStarted(1459)){
        pi.resetMap(924000201);
        pi.warp(924000201, 2);
    }else{
    pi.warp(240020101, "out00");
}
}