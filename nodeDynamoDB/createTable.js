const {
  CreateTableCommand
} = require("@aws-sdk/client-dynamodb")

const client = require("./dynamoClient")

async function createTable() {
  const command = new CreateTableCommand({
    TableName: "Employees-2023BCD0059",
    AttributeDefinitions: [
      { AttributeName: "emp_id", AttributeType: "S" }
    ],
    KeySchema: [
      { AttributeName: "emp_id", KeyType: "HASH" }
    ],
    BillingMode: "PAY_PER_REQUEST"
  })

  await client.send(command)
  console.log("Table created")
}

createTable()
