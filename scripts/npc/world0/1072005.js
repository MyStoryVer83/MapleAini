var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
			
		if (cm.getPlayer().getMapId() == 108000200) {
			if (cm.haveItem(4031013, 30)) {
				if (status == 0)
					cm.sendNext("Ohhhhh.. 你搜集到了#r30个含有黑暗力量的珠子#k 真是令人难以置信.. 你已经通过了测试，带上 #b英雄证书#k回去吧。");
				else if (status == 1) {
					cm.removeAll(4031013);
					cm.gainItem(4031009, -1);
					cm.gainItem(4031012);
					cm.warp(101020000, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("考试很简单……只要在准备好的考场上消灭怪物 \r\n 搜集#r30个含有黑暗力量的珠子#k");
				cm.dispose();
			}
		} else {
			if (cm.haveItem(4031009)) {
				if (status == 0)
					cm.sendNext("真不敢相信你既然获得了#b汉斯#k的推荐信。那么就赶快接受我的考试获得二转的资格吧！")
				else if (status == 1)
					cm.sendNextPrev("我会送你到一个隐藏的地图。你会看到你通常不会看到的怪物。它们看起来和普通的怪物一样，但十分的凶残。");
				else if (status == 2)
					cm.sendNextPrev("考试很简单……只要在准备好的考场上消灭怪物，搜集#r30个含有黑暗力量的珠子#k就行……你想马上参加考试吗？接受的话，我就把你送到考场去。");
				else if (status == 3)
					cm.sendYesNo("一旦进入考场，你将不能离开。如果你死了任务就会重新来过。那么你现在想去吗？");
				else if (status == 4)
					cm.sendNext("好吧！我这送你进去,只要搜集#r30个含有黑暗力量的珠子#k然后交给我,千万要小心。祝你好运。");
				else if (status == 5) {
					cm.warp(108000200, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("请你走开。");
				cm.dispose();
			}
		}
    }
}