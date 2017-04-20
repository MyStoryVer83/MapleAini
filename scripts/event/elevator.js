/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
				   Matthias Butz <matze@odinms.de>
				   Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation version 3 as published by
the Free Software Foundation. You may not use, modify or distribute
this program under any other version of the GNU Affero General Public
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var Ludi99;
var Ludi2;
var Ludi;
var Korean_to_Ludi;
var Korean;
var Ludi_to_Korean;

function init() {
    Ludi99 = em.getChannelServer().getMapFactory().getMap(222020200);
	Ludi2 = em.getChannelServer().getMapFactory().getMap(222020100);
	Ludi = em.getChannelServer().getMapFactory().getMap(222020110);
    Korean_to_Ludi = em.getChannelServer().getMapFactory().getMap(222020111);
	Korean = em.getChannelServer().getMapFactory().getMap(222020210);
	Ludi_to_Korean = em.getChannelServer().getMapFactory().getMap(222020211);
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("goingUp", "false");
    em.setProperty("goingDown", "false");
}

function goUp() {
    em.schedule("goingUpNow", 50000); // might be 60
}

function goDown() {
    em.schedule("goingDownNow", 50000); // might be 60
}

function goingUpNow() {
	Ludi.warpEveryone(Korean_to_Ludi.getId());
    em.setProperty("goingUp", "true");
    em.schedule("isUpNow", 55000);
    Ludi2.setReactorState();
}



function goingDownNow() {
	Korean.warpEveryone(Ludi_to_Korean.getId());
    em.setProperty("goingDown", "true");
    em.schedule("isDownNow", 55000);
    Ludi99.setReactorState();
}

function isUpNow() {
    Ludi2.resetReactors();
    Korean_to_Ludi.warpEveryone(Ludi99.getId());
    em.setProperty("goingUp", "false"); // clear
}

function isDownNow() {
    Ludi99.resetReactors();
    Ludi_to_Korean.warpEveryone(Ludi2.getId());
    em.setProperty("goingDown", "false"); // clear
}

function cancelSchedule() {
    
}  