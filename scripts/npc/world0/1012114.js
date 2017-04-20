/*
  Growlie (that fatass uhh.. hungry lion or whatever)
  FightDesign @RageZONE
  */
importPackage(Packages.net.world);
importPackage(Packages.tools);
importPackage(java.awt);

var status = 0;
var chosen = -1;

function start() {
    if (cm.isLeader()) {
		var eim = cm.getEventManager("HenesysPQ").getInstance("HenesysPQ_" + cm.getParty().getLeader().getName());
	    if (eim.getProperty("clear").equals("true")) {
		    status = 50;
		    cm.sendNext("嗯...这很美味.请你下次在带一些#b#t4001101##k来看看我!");
		} else
        cm.sendSimple("你好，我是小老虎...\r\n#b#L0#请告诉我这是什么地方。#l\r\n#L1#我给你带来了#t4001101#。#l\r\n#L2#我想离开这个地方。#l");
    } else {
        cm.sendSimple("你好，我是小老虎...\r\n#b#L0#请告诉我这是什么地方。#l\r\n#L1#我给你带来了#t4001101#。#l\r\n#L2#我想离开这个地方。#l");
    }
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
		return;
    } else {
	    if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 0)
            status += chosen == 2 ? 1 : -1;
        else
            status++;
		if (status == 51) {
		    var eim = cm.getEventManager("HenesysPQ").getInstance("HenesysPQ_" + cm.getParty().getLeader().getName());
			eim.finishPQ();
            cm.dispose();
			return;
		}
        if (status == 1) {
		    if (chosen == -1)
			    chosen = selection;
            if (chosen == 0) {
                cm.sendNext("满月下月妙制作美味年糕的地方。");
            } else if (chosen == 1) {
                if (cm.haveItem(4001101, 10)) {
                    cm.sendNext("哇哦，这不是月妙制作的这个蛋糕吗？快点给我。");
                } else {
                    cm.sendOk("你没有带来#b10 个#t4001101#s#k.");
                    cm.dispose();
                }
            } else if (chosen == 2) {
                cm.sendYesNo("你确定要离开这里吗？");
            }
			else {
			    cm.dispose();
				return;
			}
        } else if (status == 2) {
            if (chosen == 0) {
                cm.sendNextPrev("收集月见草种子，并将种子种植在月牙附近的土地上，绽放出美丽的花朵。月见草种子有6种不同的颜色。月牙附近的6块土地也必须找到适合的月见草种子。");
            } else if (chosen == 1) {
                cm.sendNext("嗯...这很美味.请你下次在带一些#b#t4001101##k来看看我!");
                cm.gainItem(4001101, -10);
                cm.givePartyExp("HenesysPQ");
                var eim = cm.getEventManager("HenesysPQ").getInstance("HenesysPQ_" + cm.getParty().getLeader().getName());
				eim.setProperty("clear", "true");
				var map = eim.getMapInstance(cm.getPlayer().getMapId());
				map.allowSummonState(false);
				map.killAllMonstersNotFriendly();
				map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
				map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
				cm.dispose();
            } else {
			     if (mode == 1) {
			     	var eim = cm.getEventManager("HenesysPQ").getInstance("HenesysPQ_" + cm.getParty().getLeader().getName());
				 	eim.disbandParty();
				 } else {
				 	cm.sendOk("你最好收集一些美味的年糕，因为时间已经不多了，啊呜！");
				 }
				 cm.dispose();
			}
        } else if (status == 3) {
            if (chosen == 0) {
                cm.sendNextPrev("当月见草花绽放时，满月将会升起，那就是月妙出现并开始碾磨的时候。你的任务是集中精力保护月妙制作出最好的年糕。");
            } else if (chosen == 1) {
				var eim = cm.getEventManager("HenesysPQ").getInstance("HenesysPQ_" + cm.getParty().getLeader().getName());
				eim.finishPQ();
                cm.dispose();
            }
        } else if (status == 4) {
            if (chosen == 0) {
                cm.sendNextPrev("你和你的组队队员必须在规定的时间里带给我10个年糕。");
            }
        } else {
		    cm.dispose();
		}
    
    }
}	