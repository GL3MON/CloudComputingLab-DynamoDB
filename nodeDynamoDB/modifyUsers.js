const { DynamoDBDocumentClient, UpdateCommand } =
  require("@aws-sdk/lib-dynamodb")

const client = require("../dynamoClient")
const docClient = DynamoDBDocumentClient.from(client)

async function updateUser() {
  const command = new UpdateCommand({
    TableName: "Employees-2023BCD0059",
    Key: {
      emp_id: "u001"
    },
    UpdateExpression: "SET age = :a, #role = :r",
    ExpressionAttributeNames: {
      "#role": "role"
    },
    ExpressionAttributeValues: {
      ":a": 22,
      ":r": "ML Researcher"
    }
  })

  try {
    await docClient.send(command)
    console.log("User updated")
  } catch (err) {
    console.error("Update failed:", err)
  }
}

updateUser()
