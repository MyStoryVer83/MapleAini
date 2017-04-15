/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import client.inventory.MapleInventoryType;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.CashShop;
import server.MapleItemInformationProvider;

/**
 *
 * @author Flower
 */
public class DumpCashShop {

    private static final MapleDataProvider data =MapleDataProviderFactory.getDataProvider(new File("wz/Etc.wz"));
    public static void main(String[] args) { 
        Map<Integer, Map<String, Integer>> itemConmes = new HashMap<>();
 System.out.println("读取游戏商城数据");
        for (MapleData field : data.getData("Commodity.img").getChildren()) {
            Map<String, Integer> itemConme = new HashMap<>();
            int sn = MapleDataTool.getIntConvert("SN", field, 0);
            int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
            int count = MapleDataTool.getIntConvert("Count", field, 0);
            int price = MapleDataTool.getIntConvert("Price", field, 0);     
            int period = MapleDataTool.getIntConvert("Period", field, 0);
            int priority = MapleDataTool.getIntConvert("Priority", field, 0);
            int gender = MapleDataTool.getIntConvert("Gender", field, -1);;

            itemConme.put("sn", sn);
            itemConme.put("itemId", itemId);
            itemConme.put("count", count);
            itemConme.put("price", price);
            itemConme.put("period", period);           
            itemConme.put("priority", priority);
            itemConme.put("gender", gender);
            itemConmes.put(itemId, itemConme);
            System.out.println("SN："+sn+"物品ID："+itemId+"count："+count+"price："+price+"period："+period+"priority："+priority+"男/女"+gender);
        }
      System.out.println("正在写入数据库，清稍后...");    
        for (Map<String, Integer> field : itemConmes.values()) {

            try {
                final int sn = field.get("sn");
                final int itemId = field.get("itemId");
                final int count = field.get("count");
                final int price = field.get("price");
                final int period = field.get("period");       
                final int priority = field.get("priority");
                final int gender = field.get("gender");


                try (Connection con = DatabaseConnection.getConnection(); PreparedStatement ps = con.prepareStatement("INSERT INTO cashshop_items (sn, itemid,count,price,period,priority,gender,onsale) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)")) {
                    ps.setInt(1, sn);
                    ps.setInt(2, itemId);
                    ps.setInt(3, count >= 1 ? count : 0);
                    ps.setInt(4, price);
                    ps.setInt(5, period);
                    ps.setInt(6, priority);
                    ps.setInt(7, gender);
                    ps.setInt(8, 0);
                    ps.executeUpdate();
                    ps.toString();
                }
            } catch (SQLException ex) {
                System.err.println("CashShopDumper" + ex);
            }
        }
           System.out.println("商城数据提取完毕");    
    }
}
