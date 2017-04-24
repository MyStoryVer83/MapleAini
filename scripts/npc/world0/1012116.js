function start() {
    var status = cm.getQuestStatus(20705);
    if (status == 0) {
        cm.sendNext("普通的草丛。");
    } else if (status == 1) {
        cm.forceCompleteQuest(20705);
        cm.sendNext("发现个黑影一闪而过！");
    } else if (status == 2) {
        cm.sendNext("黑影已经不见了。先去告诉#p1103001#吧.");
    }
    cm.dispose();
}

function action(mode, type, selection) {
    cm.dispose();
}