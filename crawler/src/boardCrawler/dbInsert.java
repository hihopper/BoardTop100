package boardCrawler;

import java.util.ArrayList;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class dbInsert {
	public static void insertDB(ArrayList<Document> list) {
		// or use a connection string
		MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
		MongoClient mongoClient = new MongoClient(connectionString);

		MongoDatabase database = mongoClient.getDatabase("sms-dev");

		MongoCollection<Document> collection = database.getCollection("top100");
		collection.deleteMany(new Document());

		collection.insertMany(list);
//		One(new Document().append("AAA", "aaa").append("AAA2", "aaa2"));
	}
}
