var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
	    cm.sendNext("终于找到了，符合契约人条件的人...", 1);
	} else if (status == 1) {
	    cm.sendNextPrev("履行契约的条件...", 1);
	} else if (status == 2) {
	    cm.warp(900090101);
	    cm.dispose();
	}
}