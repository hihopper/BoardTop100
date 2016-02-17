package boardCrawler;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class BoardCrawler {
	

	public static void main(String[] args) {

        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            HttpGet httpGet = new HttpGet("http://aagag.com/mirror/");
            CloseableHttpResponse response = httpclient.execute(httpGet);
            try {
                System.out.println(response.getStatusLine());
                
                ArrayList<org.bson.Document> list = new ArrayList<org.bson.Document>();
                
                HttpEntity entity1 = response.getEntity();
    			Document doc = Jsoup.parse(entity1.getContent(), "utf-8", "");
    			Elements els = doc.select("table#issue_rank tbody tr");
    			for( Element e: els) {
    				Element els2 = e.select("a").first();
    				if( els2 != null) {
    					els2.children().remove();
    					System.out.println(els2.attr("href") + " ===> " + els2.text());
    					list.add(new org.bson.Document()
    							.append("href", els2.attr("href"))
    							.append("text", els2.text())
    							);
    				}
    			}
				dbInsert.insertDB(list);
                EntityUtils.consume(entity1);
                
    			
            } finally {
                response.close();
            }

           
        } catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} finally {
            try {
				httpclient.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
    }

}