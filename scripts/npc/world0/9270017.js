var status = 0;

function start() {
    cm.sendYesNo("是否要回去？");
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (mode == 0)
            cm.sendOk("Please hold on for a sec, and plane will be taking off. Thanks for your patience.");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        cm.sendNext("88~");
    }else if(status == 2){
		cm.warp(103000000);
		cm.dispose();
	}
}