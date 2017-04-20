function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("通往 " + (cm.c.getPlayer().getMapId() == 103000100 ? "新叶城" : "废弃都市") + " 的车票需要 #b5000 金币#k. 你想购买 #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("你要下车吗？");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
        if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000), 1);
            cm.sendNext("给你.");
        }else
            cm.sendNext("穷B，滚.");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}