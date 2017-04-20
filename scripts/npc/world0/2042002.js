var DISABLED = false;

var SavedLocationType = Packages.server.maps.SavedLocationType;

// Relevant Monster Carnival classes
var MonsterCarnival = Packages.server.partyquest.mcpq.MonsterCarnival;
var MCTracker = Packages.server.partyquest.mcpq.MCTracker;
var MCParty = Packages.server.partyquest.mcpq.MCParty;
var MCField = Packages.server.partyquest.mcpq.MCField;
var MCTeam = Packages.server.partyquest.mcpq.MCField.MCTeam;

// NPC variables
var status = -1;
var store = false;
var ctx = -1; //context
var storeInfo;
var purchaseId;
var purchaseCost;

// Reference
var coinId = 4001129;
var coinIcon = "#i" + coinId + "#";
var infoMaps = [220000000, 200000000, 103000000, 540000000]; // ludi, orbis, kerning, singapore
var gradeS = 600
var gradeA = 500
var gradeB = 400
var gradeC = 300
var gradeD = 200
var gradeE = 100

var expRewards = [[150000, 100000], // S Winner/Loser
                  [100000, 70000], // A Winner/Loser
                  [75000, 43250], // B Winner/Loser
                  [50000, 25000], // C Winner/Loser
                  [25000, 12500], // D Winner/Loser
                  [12500, 6250],  // E Winner/Loser
                  [5000, 2500]    // F Winner/Loser
                  ];

// Exchange stores
var warrior = [[1302004, 7], [1402006, 7], [1302009, 10], [1402007, 10],
               [1302010, 20], [1402003, 20], [1312006, 7], [1412004, 7],
               [1312007, 10], [1412005, 10], [1312018, 20], [1412003, 20],
               [1322015, 7], [1422008, 7], [1322016, 10], [1422007, 10],
               [1322017, 20], [1422005, 20], [1432003, 7], [1442003, 7],
               [1432005, 10], [1442009, 10], [1442005, 20], [1432004, 20]];

var magician = [[1372001, 7], [1382018, 7], [1372012, 10], [1382019, 10],
                [1382001, 20], [1372007, 20]];

var archer = [[1452006, 7], [1452007, 10], [1452008, 20], [1462005, 7],
              [1462006, 10], [1462007, 20]];

var thief = [[1472013, 7], [1472017, 10], [1472021, 20], [1332014, 7],
             [1332011, 10], [1332031, 10], [1332016, 20], [1332034, 20]];

var pirate = [[1482005, 7], [1482006, 10], [1482007, 20], [1492005, 7],
              [1492006, 10], [1492007, 20]];

var necklace = [[1122007, 50], [2041211, 40]];

// Long Text Descriptions
var infoText = "You wish to know about the Monster Carnival? Very well. The Monster Carnival is a place of trilling battles and exciting competiton against people just as strong and motivated as yourself. You must summon monsters and defeat the monsters summoned by the opposing party. That's the essence of the Monster Carnival. Once you enter the Carnival Field, the task is to earn CP by hunter monsters from the opposing party and use those CP's to distract the opposing party from hunting monsters. There are three ways to distract the other party; Summon a Monster, Skill or Protector. Please remember this though, it's never a good idea to save up CP just for the sake of it. The CP's you've used will also help determine the winner and the loser of the carnival.";
var no = "��û���㹻��ð�յ�����������жһ���";

function getGrade(cp) {
    // Returns index of corresponding expRewards pair.
    if (cp >= gradeS) {
        return 0;
    } else if (cp >= gradeA) {
        return 1;
    } else if (cp >= gradeB) {
        return 2;
    } else if (cp >= gradeC) {
        return 3;
    } else if (cp >= gradeD) {
        return 4;
    } else if (cp >= gradeE) {
        return 5;
    } else {
        return 6;
    }
}

function isTownMap(map) {
    for (var i = 0; i < infoMaps.length; i++) {
        if (infoMaps[i] == map) {
            return true;
        }
    }
    return false;
}

function isExitMap(map) {
    return map == 980000010;
}

function isWinnerMap(map) {
    return (map >= 980000000 && map <= 980000700 && map % 10 == 3);
}

function isLoserMap(map) {
    return (map >= 980000000 && map <= 980000700 && map % 10 == 4);
}

var CONTEXT_NONE = -1;
var CONTEXT_TOWN = 0;
var CONTEXT_EXIT = 1;
var CONTEXT_WIN  = 2;
var CONTEXT_LOSE = 3;

function start() {
    if (DISABLED) {
        cm.sendOk("��ʱ�޷����й�����껪��");
        cm.dispose();
        return;
    }
    m = cm.getMapId();
    if (isTownMap(m)) {
        ctx = CONTEXT_TOWN;
    } else if (isExitMap(m)) {
        ctx = CONTEXT_EXIT;
    } else if (isWinnerMap(m)) {
        ctx = CONTEXT_WIN;
    } else if (isLoserMap(m)) {
        ctx = CONTEXT_LOSE;
    } else {
        ctx = CONTEXT_NONE;
    }

    action(1, 0, 0);
}

function doLoserMap(mode, type, selection) {
    if (cm.getPlayer().getMCPQParty() == null) {
        cm.warp(MonsterCarnival.MAP_LOBBY);
        cm.dispose();
        return;
    }

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            cm.sendNext("���ź�����û��ȡ�ù�����껪��ʤ����ף���´κ��ˣ�");
        } else if (status == 1) {
            var points = cm.getPlayer().getMCPQParty().getTotalCP();
            var grade = getGrade(points);
            var letterGrade = "ABCDF"[grade];
            var expReward = expRewards[grade][1];

            cm.sendNext("���������: #b" + letterGrade + "\r\n\r\n#k��þ���ֵ: " + expReward);
            cm.gainExp(expReward);
        } else if (status == 2) {
            cm.warp(MonsterCarnival.MAP_LOBBY);
            cm.dispose();
        }
    }
}

function doWinnerMap(mode, type, selection) {
    if (cm.getPlayer().getMCPQParty() == null) {
        cm.warp(MonsterCarnival.MAP_LOBBY);
        cm.dispose();
        return;
    }

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            cm.sendNext("��ϲ�㣡����˹�����껪��ʤ����");
        } else if (status == 1) {
            var points = cm.getPlayer().getMCPQParty().getTotalCP();
            var grade = getGrade(points);
            var letterGrade = "ABCDF"[grade];
            var expReward = expRewards[grade][0];

            cm.sendNext("���������: #b" + letterGrade + "\r\n\r\n#k��þ���ֵ: " + expReward);
            cm.gainExp(expReward);
        } else if (status == 2) {
            cm.warp(MonsterCarnival.MAP_LOBBY);
            cm.dispose();
        }
    }
}

function doTown(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("Be sure to vote for the server every 24 hours!");
        cm.dispose();
    } else {
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            cm.sendSimple("������أ�Ҫ��û�г��Թ�������껪�Ļ�����û����ȿ�һ��˵�����档\r\n\r\n#b#L0#�ƶ���������껪��ͼ#l\r\n#L1#���йع�����껪˵��#l\r\n#L2#ð�յ�����ҽ���#l");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getChar().getLevel() < MonsterCarnival.MIN_LEVEL || cm.getChar().getLevel() > MonsterCarnival.MAX_LEVEL) {
                    cm.sendOk("��ĵȼ�������� " + MonsterCarnival.MIN_LEVEL + " ��,���� " + MonsterCarnival.MAX_LEVEL + " ��");
                    cm.dispose();
                    return;
                }
                cm.getChar().saveLocation(SavedLocationType.MONSTER_CARNIVAL);
                cm.warp(MonsterCarnival.MAP_LOBBY, 4);
                cm.dispose();
                return;
            } else if (selection == 1) {
                cm.sendPrev(infoText);
                cm.dispose();
                return;
            } else if (selection == 2) {
                store = true;
                cm.sendSimple("��ѡ����Ҫ��������Ʒ��\r\n" +
                    "#L101##bսʿ����\r\n" +
                    "#L102#ħ��ʦ����\r\n" +
                    "#L103#����������\r\n" +
                    "#L104#��������\r\n" +
                    "#L105#��������\r\n" +
                    "#L106#�ݱ˵���������");
            }
        } else if (status == 2) {
            if (store) {
                switch (selection) {
                    case 101:
                        storeInfo = warrior;
                        break;
                    case 102:
                        storeInfo = magician;
                        break;
                    case 103:
                        storeInfo = archer;
                        break;
                    case 104:
                        storeInfo = thief;
                        break;
                    case 105:
                        storeInfo = pirate;
                        break;
                    case 106:
                        storeInfo = necklace;
                        break;
                    default:
                        storeInfo = [];
                }
                if (storeInfo.length == 0) {
                    cm.sendOk("That store doesn't exist.");
                    cm.dispose();
                    return;
                }
                var storeText = "";
                for (var i = 0; i < storeInfo.length; ++i) {
                    var wepId = storeInfo[i][0];
                    var cost = storeInfo[i][1];
                    storeText += "#L" + i + "##v" + wepId + "#    #z" + wepId + "#     " + coinIcon + cost + "��"+"#l\r\n";
                }
                cm.sendSimple(storeText);
            } else {
                MCTracker.log("[MCPQ_Info] CONTEXT_TOWN: Invalid status 2");
            }
        } else if (status == 3) {
            if (store) {
                purchaseId = storeInfo[selection][0];
                purchaseCost = storeInfo[selection][1];

                if (cm.haveItem(coinId, purchaseCost)) {
                    cm.sendYesNo("Are you sure you want to purchase #i" + purchaseId + "#? You will have #r#e" + (cm.itemQuantity(coinId) - purchaseCost) + " " + coinIcon + "##k#n remaining.");
                } else {
                    cm.sendOk("��û���㹻��ð�յ������");
                    cm.dispose();
                }
            } else {
                MCTracker.log("[MCPQ_Info] CONTEXT_TOWN: Invalid status 3");
            }
        } else if (status == 4) {
            if (store) {
                if (cm.haveItem(coinId, purchaseCost)) {
                    cm.gainItem(coinId, -purchaseCost);
                    cm.gainItem(purchaseId);
                    cm.sendOk("Congratulations! Enjoy your new item.");
                    cm.dispose();
                }
            } else {
                MCTracker.log("[MCPQ_Info] CONTEXT_TOWN: Invalid status 4");
            }
        }
    }
}

function doExit() {
    cm.warp(MonsterCarnival.MAP_LOBBY);
    cm.sendOk("Hope you had fun in the Carnival PQ!");
    cm.dispose();
}

function action(mode, type, selection) {
    switch (ctx) {
        case CONTEXT_TOWN:
            doTown(mode, type, selection);
            break;
        case CONTEXT_EXIT:
            doExit();
            break;
        case CONTEXT_LOSE:
            doLoserMap(mode, type, selection);
            break;
        case CONTEXT_WIN:
            doWinnerMap(mode, type, selection);
            break;
        default:
            MCTracker.log("[MCPQ_INFO] Invalid context (value: " + ctx + ")");
            cm.dispose();
    } }
