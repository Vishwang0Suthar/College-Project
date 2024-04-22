import React from "react";
import connectToDatabase from "@/lib/mongodb/index.mjs";
type Props = {};

const Home = (props: Props) => {
  async function someFunction() {
    try {
      const db = await connectToDatabase();
      // Now you can use 'db' to perform database operations
      // For example, you can query data from a collection
      const result = await db.collection("your_collection").find({}).toArray();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  someFunction();

  return <div>pagke</div>;
};

export default Home;
