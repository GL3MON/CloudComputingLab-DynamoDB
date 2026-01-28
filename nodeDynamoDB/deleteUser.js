const { DynamoDBDocumentClient, DeleteCommand } =
  require("@aws-sdk/lib-dynamodb")

const client = require("./dynamoClient")
const docClient = DynamoDBDocumentClient.from(client)

async function deleteUser() {
  const command = new DeleteCommand({
    TableName: "Employees-2023BCD0059",
    Key: {
      emp_id: "u001"
    }
  })

  await docClient.send(command)
  console.log("User deleted")
}

deleteUser()
