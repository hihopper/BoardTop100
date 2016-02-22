package boardCrawler;

import java.util.ArrayList;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class dbInsert {
    private static final Logger logger = LoggerFactory.getLogger("MAIN");

	public static void insertDB(ArrayList<Document> list) {
		// or use a connection string
//		MongoClientURI connectionString = new MongoClientURI("mongodb://211.239.124.48:27017");
		MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
		MongoClient mongoClient = new MongoClient(connectionString);
		try {
			
			MongoDatabase database = mongoClient.getDatabase("top100");
	
			MongoCollection<Document> collection = database.getCollection("top100");
			collection.deleteMany(new Document());
	
			collection.insertMany(list);
            logger.info("INSERT: " + list.size());

	//		One(new Document().append("AAA", "aaa").append("AAA2", "aaa2"));
		}
		finally {
			mongoClient.close();
			
		}
	}
}
