var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("你好。我是码头的售票员。你想离开金银岛，前往其他地区吗？从这里开往神秘岛的#b天空之城站#k的飞艇#b以整点为基准，每15分钟出发一班#k。船票需要#b"+cost+" 金币#k.你确定要购买#b#t4031045##k?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("还有别的事在这里没办完吗？");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("你确定你有#b"+cost+" 金币#k吗? 如果是这样，那么我希望你检查你的背包是否满了.");
                cm.dispose();
            }
        }
    }
}
