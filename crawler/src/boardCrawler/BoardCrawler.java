package boardCrawler;

import java.util.ArrayList;


public class BoardCrawler {
	public static void test(String[] args) {
		Crawler4Aggag.crwaling();
	}
	public static void main(String[] args) {
		int i = 0;
		while(true) {
			if (i++ % 60 != 0) {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {}
				continue;
			}
			ArrayList<org.bson.Document> list = Crawler4Aggag.crwaling();
			dbInsert.insertDB(list);
		}
	}
}
