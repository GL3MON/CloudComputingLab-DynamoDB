const { DynamoDBDocumentClient, PutCommand } =
    require("@aws-sdk/lib-dynamodb")

const client = require("../dynamoClient")
const docClient = DynamoDBDocumentClient.from(client)

const users = [
    { emp_id: "u001", name: "Harissh", role: "AI Engineer", age: 21 },
    { emp_id: "u002", name: "Ram", role: "Data Scientist", age: 28 },
    { emp_id: "u003", name: "Sam", role: "Backend Engineer", age: 33 },
    { emp_id: "u004", name: "Sophie", role: "Product Manager", age: 29 }
]

async function insertUsers() {
    const puts = users.map((user) =>
        docClient.send(new PutCommand({ TableName: "Employees-2023BCD0059", Item: user }))
    )

    await Promise.all(puts)
    console.log(`Inserted ${users.length} users`)
}

insertUsers().catch((err) => {
    console.error("Failed to insert users:", err)
})
