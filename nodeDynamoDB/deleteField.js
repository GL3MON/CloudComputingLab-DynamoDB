const client = require("./dynamoClient")

const {
    DynamoDBDocumentClient,
    GetCommand,
    ScanCommand,
    UpdateCommand,
} = require("@aws-sdk/lib-dynamodb")

const docClient = DynamoDBDocumentClient.from(client)

async function removeField() {
  const command = new UpdateCommand({
    TableName: "Employees-2023BCD0059",
    Key: { emp_id: "u001" },
    UpdateExpression: "REMOVE age"
  })

  await docClient.send(command)
  console.log("Field removed")
}

removeField()
