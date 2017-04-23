var MonsterCarnival = Packages.server.partyquest.mcpq.MonsterCarnival;
var MCTracker = Packages.server.partyquest.mcpq.MCTracker;
var MCParty = Packages.server.partyquest.mcpq.MCParty;
var MCField = Packages.server.partyquest.mcpq.MCField;
var MCTeam = Packages.server.partyquest.mcpq.MCField.MCTeam;

// NPC variables
var status = -1;
var carnival, field;
var room = -1;

function start() {
    if (!MonsterCarnival.isLobbyMap(cm.getMapId())) {
        MCTracker.log("与助理 蓝进行非法对话。所在地图：" + cm.getMapId() + " 玩家：" + cm.getName());
        cm.sendOk("请不要进行非法操作。");
        cm.dispose();
        return;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 1) status++;
    else status--;

    if (status == 0) {
        if (cm.getParty() == null) {
            cm.warp(MonsterCarnival.MAP_LOBBY);
            cm.dispose();
            return;
        }
        options = ["#L1#离开这个房间 #r#e（警告：如果滥用的话将禁止您进行怪物嘉年华）#b#n.#l",
                   "#L2#没什么事，我要进行嘉年华对战。#l"];
        if (cm.isLeader()) {
            options.unshift("#L0#查看待处理的挑战#l");
        }

        text = "欢迎来到怪物嘉年华。我是#r助理 蓝#k. 我能为你做点什么？#b\r\n";
        for (var i = 0; i < options.length; i++) {
            text += options[i];
            text += "\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        field = cm.getChar().getMCPQField();
        if (selection == 0) {
            if (!cm.isLeader()) {
                cm.sendOk("请让你的组队队长和我说话.");
                cm.dispose();
                return;
            }
            if (!field.hasPendingRequests()) {
                cm.sendOk("目前没有待处理的请求。");
                cm.dispose();
                return;
            }
            cm.sendSimple(field.getNPCRequestString());
        } else if (selection == 1) {
            if (field != null) {
                field.deregister(true);
            } else {
                cm.warp(MonsterCarnival.MAP_EXIT);
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else if (status == 2) {
        var code = field.acceptRequest(selection);
        if (code == 1) {
            cm.sendOk("接受挑战。");
        } else {
            cm.sendOk("出现未知错误。");
        }
        cm.dispose();
    }
}
