/*
 ����ð�յ�
 �г��Զ��ݵ��¼�
*/

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.SECOND, 5);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 5000; //2min
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    em.autoExp();
    //em.autogain(10);
    var iter = em.getInstances().iterator();
    while (iter.hasNext()) {
    var eim = iter.next();
    }
}
