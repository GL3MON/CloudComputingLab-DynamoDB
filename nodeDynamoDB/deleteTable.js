const { DynamoDBClient, DeleteTableCommand } =
  require("@aws-sdk/client-dynamodb")

const client = new DynamoDBClient({
  region: "ap-south-1"
})

async function deleteTable() {
  await client.send(
    new DeleteTableCommand({
      TableName: "Employees-2023BCD0059"
    })
  )
  console.log("Table deleted")
}

deleteTable().catch(console.error)
